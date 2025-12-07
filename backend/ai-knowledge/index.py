import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для получения базы знаний AI (примеры, шаблоны, рекомендации)
    Args: event - GET запрос с опциональным параметром category
          context - контекст выполнения
    Returns: JSON с базой знаний и примерами
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
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    category = params.get('category')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    if category:
        cur.execute("""
            SELECT id, category, title, description, example_code, tags, difficulty
            FROM t_p82859479_labor_safety_app.ai_knowledge_base
            WHERE category = %s
            ORDER BY difficulty, title
        """, (category,))
    else:
        cur.execute("""
            SELECT id, category, title, description, example_code, tags, difficulty
            FROM t_p82859479_labor_safety_app.ai_knowledge_base
            ORDER BY category, difficulty, title
        """)
    
    rows = cur.fetchall()
    
    knowledge = [
        {
            'id': row[0],
            'category': row[1],
            'title': row[2],
            'description': row[3],
            'example_code': row[4],
            'tags': row[5],
            'difficulty': row[6]
        }
        for row in rows
    ]
    
    cur.execute("""
        SELECT category, COUNT(*) as count
        FROM t_p82859479_labor_safety_app.ai_knowledge_base
        GROUP BY category
    """)
    
    categories = dict(cur.fetchall())
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'knowledge': knowledge,
            'categories': categories,
            'total': len(knowledge)
        }),
        'isBase64Encoded': False
    }
