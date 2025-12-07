import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение списка модулей системы из БД
    Args: event - HTTP запрос
          context - контекст выполнения
    Returns: JSON со списком модулей
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
    
    cur.execute("""
        SELECT id, name, description, icon, status, tasks_count
        FROM t_p82859479_labor_safety_app.modules
        ORDER BY id
    """)
    
    rows = cur.fetchall()
    
    modules = [
        {
            'id': row[0],
            'title': row[1],
            'description': row[2],
            'icon': row[3],
            'status': row[4],
            'tasks': row[5]
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
        'body': json.dumps({'modules': modules}),
        'isBase64Encoded': False
    }
