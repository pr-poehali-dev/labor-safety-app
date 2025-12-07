import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Галерея готовых проектов с примерами и фильтрацией
    Args: event - dict с httpMethod, queryStringParameters
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
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Only GET allowed'}),
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor()
    
    try:
        params = event.get('queryStringParameters', {})
        category = params.get('category')
        featured_only = params.get('featured') == 'true'
        
        # Формируем запрос с фильтрами
        query = """
            SELECT 
                gallery_id, title, description, category, preview_image,
                demo_url, tech_stack, features, complexity, likes, views,
                TO_CHAR(created_at, 'YYYY-MM-DD') as created_at,
                is_featured
            FROM t_p82859479_labor_safety_app.project_gallery
            WHERE 1=1
        """
        
        query_params = []
        
        if category:
            query += " AND category = %s"
            query_params.append(category)
        
        if featured_only:
            query += " AND is_featured = true"
        
        query += " ORDER BY is_featured DESC, views DESC, likes DESC"
        
        cursor.execute(query, query_params)
        rows = cursor.fetchall()
        
        projects = []
        for row in rows:
            projects.append({
                'gallery_id': row[0],
                'title': row[1],
                'description': row[2],
                'category': row[3],
                'preview_image': row[4],
                'demo_url': row[5],
                'tech_stack': row[6],
                'features': row[7],
                'complexity': row[8],
                'likes': row[9],
                'views': row[10],
                'created_at': row[11],
                'is_featured': row[12]
            })
        
        # Получаем статистику по категориям
        cursor.execute("""
            SELECT category, COUNT(*) as count
            FROM t_p82859479_labor_safety_app.project_gallery
            GROUP BY category
            ORDER BY count DESC
        """)
        
        categories_stats = {}
        for row in cursor.fetchall():
            categories_stats[row[0]] = row[1]
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'projects': projects,
                'total': len(projects),
                'categories': categories_stats
            }),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
