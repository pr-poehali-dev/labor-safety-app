import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение данных производительности системы из БД
    Args: event - запрос с параметрами (период времени)
          context - контекст выполнения функции
    Returns: JSON с данными производительности
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
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    query = """
        SELECT 
            TO_CHAR(timestamp, 'HH24:MI') as time,
            accuracy,
            speed,
            efficiency
        FROM t_p82859479_labor_safety_app.system_performance
        ORDER BY timestamp DESC
        LIMIT 24
    """
    
    cur.execute(query)
    rows = cur.fetchall()
    
    data = [
        {
            'time': row[0],
            'accuracy': float(row[1]),
            'speed': float(row[2]),
            'efficiency': float(row[3])
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
        'body': json.dumps({'data': list(reversed(data))}),
        'isBase64Encoded': False
    }
