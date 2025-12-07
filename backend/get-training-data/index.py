import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение данных обучения нейросетей в реальном времени
    Args: event - HTTP запрос с параметром network_name (опционально)
          context - контекст выполнения
    Returns: JSON с данными обучения всех или конкретной сети
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    network_name = params.get('network_name')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    if network_name:
        query = """
            SELECT network_name, epoch, loss, accuracy, learning_rate, status, timestamp
            FROM t_p82859479_labor_safety_app.neural_network_training
            WHERE network_name = %s
            ORDER BY epoch ASC
        """
        cur.execute(query, (network_name,))
    else:
        query = """
            SELECT DISTINCT network_name
            FROM t_p82859479_labor_safety_app.neural_network_training
            ORDER BY network_name
        """
        cur.execute(query)
        networks = [row[0] for row in cur.fetchall()]
        
        result = {}
        for net in networks:
            cur.execute("""
                SELECT epoch, loss, accuracy, learning_rate, status, 
                       TO_CHAR(timestamp, 'HH24:MI:SS') as time
                FROM t_p82859479_labor_safety_app.neural_network_training
                WHERE network_name = %s
                ORDER BY epoch ASC
            """, (net,))
            
            rows = cur.fetchall()
            result[net] = {
                'epochs': [
                    {
                        'epoch': row[0],
                        'loss': float(row[1]),
                        'accuracy': float(row[2]),
                        'learning_rate': float(row[3]),
                        'status': row[4],
                        'time': row[5]
                    }
                    for row in rows
                ],
                'current_status': rows[-1][4] if rows else 'unknown',
                'current_accuracy': float(rows[-1][2]) if rows else 0
            }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'networks': result}),
            'isBase64Encoded': False
        }
    
    rows = cur.fetchall()
    data = [
        {
            'epoch': row[1],
            'loss': float(row[2]),
            'accuracy': float(row[3]),
            'learning_rate': float(row[4]),
            'status': row[5],
            'timestamp': row[6].isoformat()
        }
        for row in rows
    ]
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'data': data}),
        'isBase64Encoded': False
    }
