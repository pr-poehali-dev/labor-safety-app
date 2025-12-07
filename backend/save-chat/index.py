import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Сохранение сообщений чата в БД
    Args: event - POST запрос с message_text и sender
          context - контекст выполнения
    Returns: JSON с подтверждением сохранения
    '''
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute("""
            SELECT id, message_text, sender, timestamp
            FROM t_p82859479_labor_safety_app.chat_history
            ORDER BY timestamp DESC
            LIMIT 100
        """)
        
        rows = cur.fetchall()
        messages = [
            {
                'id': row[0],
                'text': row[1],
                'sender': row[2],
                'timestamp': row[3].isoformat()
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
            'body': json.dumps({'messages': list(reversed(messages))}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        message_text = body_data.get('message_text', '')
        sender = body_data.get('sender', 'user')
        
        if not message_text:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'message_text is required'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute("""
            INSERT INTO t_p82859479_labor_safety_app.chat_history (message_text, sender)
            VALUES (%s, %s)
            RETURNING id, timestamp
        """, (message_text, sender))
        
        row = cur.fetchone()
        conn.commit()
        
        result = {
            'id': row[0],
            'timestamp': row[1].isoformat(),
            'message_text': message_text,
            'sender': sender
        }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'success': True, 'message': result}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
