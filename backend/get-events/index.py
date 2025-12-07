import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение и управление критическими событиями
    Args: event - GET для получения, POST для отметки как прочитанного
          context - контекст выполнения
    Returns: JSON со списком критических событий
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        unread_only = params.get('unread_only') == 'true'
        
        if unread_only:
            query = """
                SELECT id, event_type, severity, title, description, 
                       module_name, is_read, created_at
                FROM t_p82859479_labor_safety_app.critical_events
                WHERE is_read = FALSE
                ORDER BY created_at DESC
                LIMIT 50
            """
        else:
            query = """
                SELECT id, event_type, severity, title, description, 
                       module_name, is_read, created_at
                FROM t_p82859479_labor_safety_app.critical_events
                ORDER BY created_at DESC
                LIMIT 50
            """
        
        cur.execute(query)
        rows = cur.fetchall()
        
        events = [
            {
                'id': row[0],
                'event_type': row[1],
                'severity': row[2],
                'title': row[3],
                'description': row[4],
                'module_name': row[5],
                'is_read': row[6],
                'created_at': row[7].isoformat()
            }
            for row in rows
        ]
        
        cur.execute("""
            SELECT COUNT(*) FROM t_p82859479_labor_safety_app.critical_events 
            WHERE is_read = FALSE
        """)
        unread_count = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'events': events,
                'unread_count': unread_count
            }),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        event_id = body_data.get('event_id')
        
        if not event_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'event_id is required'}),
                'isBase64Encoded': False
            }
        
        cur.execute("""
            UPDATE t_p82859479_labor_safety_app.critical_events
            SET is_read = TRUE
            WHERE id = %s
            RETURNING id
        """, (event_id,))
        
        conn.commit()
        result = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if result:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'success': True, 'event_id': result[0]}),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Event not found'}),
                'isBase64Encoded': False
            }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
