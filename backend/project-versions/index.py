import json
import os
import psycopg2
from datetime import datetime
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Управление версиями проектов для отката изменений
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            # Получить версии проекта
            params = event.get('queryStringParameters', {})
            project_id = params.get('project_id')
            
            if not project_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'project_id required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("""
                SELECT 
                    version_id, project_id, version_number, description,
                    changes, code_snapshot,
                    TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at,
                    created_by
                FROM t_p82859479_labor_safety_app.project_versions
                WHERE project_id = %s
                ORDER BY version_number DESC
            """, (project_id,))
            
            rows = cursor.fetchall()
            versions = []
            for row in rows:
                versions.append({
                    'version_id': row[0],
                    'project_id': row[1],
                    'version_number': row[2],
                    'description': row[3],
                    'changes': row[4],
                    'code_snapshot': row[5],
                    'created_at': row[6],
                    'created_by': row[7]
                })
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'versions': versions}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            # Создать новую версию
            body_data = json.loads(event.get('body', '{}'))
            project_id = body_data.get('project_id')
            description = body_data.get('description', 'Автосохранение')
            changes = body_data.get('changes', {})
            code_snapshot = body_data.get('code_snapshot', {})
            
            if not project_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'project_id required'}),
                    'isBase64Encoded': False
                }
            
            # Получить текущий максимальный номер версии
            cursor.execute("""
                SELECT COALESCE(MAX(version_number), 0) as max_version
                FROM t_p82859479_labor_safety_app.project_versions
                WHERE project_id = %s
            """, (project_id,))
            max_version = cursor.fetchone()[0]
            new_version = max_version + 1
            
            version_id = f"v{new_version}_{project_id}"
            
            cursor.execute("""
                INSERT INTO t_p82859479_labor_safety_app.project_versions
                (version_id, project_id, version_number, description, changes, code_snapshot)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING version_id, version_number, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS')
            """, (version_id, project_id, new_version, description, json.dumps(changes), json.dumps(code_snapshot)))
            
            result = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'version_id': result[0],
                    'version_number': result[1],
                    'created_at': result[2],
                    'message': 'Версия создана'
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            # Откатить к версии
            body_data = json.loads(event.get('body', '{}'))
            version_id = body_data.get('version_id')
            
            if not version_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'version_id required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute("""
                SELECT code_snapshot, project_id, version_number, description
                FROM t_p82859479_labor_safety_app.project_versions
                WHERE version_id = %s
            """, (version_id,))
            
            row = cursor.fetchone()
            if not row:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Версия не найдена'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'code_snapshot': row[0],
                    'project_id': row[1],
                    'version_number': row[2],
                    'description': row[3],
                    'message': 'Откат к версии выполнен'
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
