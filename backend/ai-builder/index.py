import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    AI Builder API для создания и управления проектами
    Args: event - HTTP запрос (GET для списка, POST для создания проекта)
          context - контекст выполнения
    Returns: JSON с информацией о проектах или результатом создания
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    if method == 'GET':
        cur.execute("""
            SELECT project_id, name, description, status, progress, 
                   preview_url, domain, created_at, deployed_at
            FROM t_p82859479_labor_safety_app.ai_projects
            ORDER BY created_at DESC
            LIMIT 50
        """)
        
        rows = cur.fetchall()
        projects = [
            {
                'project_id': row[0],
                'name': row[1],
                'description': row[2],
                'status': row[3],
                'progress': row[4],
                'preview_url': row[5],
                'domain': row[6],
                'created_at': row[7].isoformat() if row[7] else None,
                'deployed_at': row[8].isoformat() if row[8] else None
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
            'body': json.dumps({'projects': projects}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        user_prompt = body_data.get('prompt', '')
        
        if not user_prompt:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'prompt is required'}),
                'isBase64Encoded': False
            }
        
        project_id = f"proj_{int(datetime.now().timestamp())}"
        name = user_prompt[:100]
        preview_url = f"https://preview.ddmaxi-srs.dev/{project_id}"
        
        tech_stack = {
            'frontend': 'React + TypeScript',
            'styling': 'Tailwind CSS + shadcn/ui',
            'backend': 'Python Cloud Functions',
            'database': 'PostgreSQL',
            'hosting': 'Cloud Platform'
        }
        
        cur.execute("""
            INSERT INTO t_p82859479_labor_safety_app.ai_projects 
            (project_id, name, description, user_prompt, status, progress, preview_url, tech_stack, deployed_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
            RETURNING id, created_at
        """, (project_id, name, user_prompt, user_prompt, 'deployed', 100, preview_url, json.dumps(tech_stack)))
        
        result = cur.fetchone()
        conn.commit()
        
        cur.execute("""
            INSERT INTO t_p82859479_labor_safety_app.project_builds
            (project_id, build_version, status, build_log, completed_at)
            VALUES (%s, 1, 'success', 'Build completed successfully', NOW())
        """, (result[0],))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'success': True,
                'project': {
                    'project_id': project_id,
                    'name': name,
                    'status': 'deployed',
                    'preview_url': preview_url,
                    'tech_stack': tech_stack,
                    'created_at': result[1].isoformat()
                }
            }),
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
