-- Таблица для хранения проектов AI Builder
CREATE TABLE t_p82859479_labor_safety_app.ai_projects (
    id SERIAL PRIMARY KEY,
    project_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    user_prompt TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'building',
    progress INTEGER DEFAULT 0,
    preview_url TEXT,
    domain VARCHAR(200),
    tech_stack JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deployed_at TIMESTAMPTZ,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Таблица для истории билдов и деплоев
CREATE TABLE t_p82859479_labor_safety_app.project_builds (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES t_p82859479_labor_safety_app.ai_projects(id),
    build_version INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    build_log TEXT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Таблица для AI-рекомендаций и подсказок
CREATE TABLE t_p82859479_labor_safety_app.ai_knowledge_base (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    example_code TEXT,
    tags TEXT[],
    difficulty VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Заполнение базы знаний AI
INSERT INTO t_p82859479_labor_safety_app.ai_knowledge_base (category, title, description, example_code, tags, difficulty) VALUES
('frontend', 'Создание адаптивного лендинга', 'Современный одностраничный сайт с анимациями, адаптивным дизайном и формой обратной связи', 'React + Tailwind CSS + shadcn/ui', ARRAY['landing', 'responsive', 'animations'], 'easy'),
('frontend', 'Интернет-магазин с корзиной', 'Полнофункциональный магазин с каталогом товаров, фильтрацией, корзиной и оформлением заказа', 'React + Context API + LocalStorage', ARRAY['ecommerce', 'shopping-cart', 'catalog'], 'medium'),
('fullstack', 'Todo-приложение с БД', 'Планировщик задач с возможностью создания, редактирования, фильтрации задач и сохранением в базу данных', 'React + Python + PostgreSQL', ARRAY['todo', 'crud', 'database'], 'medium'),
('fullstack', 'Дашборд с аналитикой', 'Панель управления с графиками, таблицами, статистикой и экспортом данных в Excel', 'React + Recharts + Python API', ARRAY['dashboard', 'analytics', 'charts'], 'hard'),
('fullstack', 'Чат-приложение', 'Мессенджер с историей сообщений, уведомлениями и сохранением в базу данных', 'React + WebSocket + PostgreSQL', ARRAY['chat', 'realtime', 'messaging'], 'hard'),
('backend', 'REST API с авторизацией', 'Backend с эндпоинтами для CRUD операций, JWT-токенами и валидацией данных', 'Python + FastAPI + PostgreSQL', ARRAY['api', 'auth', 'jwt'], 'medium'),
('integration', 'Интеграция с оплатой', 'Подключение платежных систем (Stripe, YooKassa) для приема онлайн-платежей', 'Python + Payment Gateway API', ARRAY['payments', 'stripe', 'ecommerce'], 'hard'),
('seo', 'SEO-оптимизация сайта', 'Настройка метатегов, Open Graph, Schema.org разметки для лучшей индексации', 'HTML meta tags + JSON-LD', ARRAY['seo', 'meta', 'optimization'], 'easy'),
('deployment', 'Публикация в интернет', 'Автоматический деплой проекта на облачные серверы с SSL-сертификатом', 'Cloud Functions + CDN', ARRAY['deploy', 'hosting', 'ssl'], 'easy'),
('design', 'UI/UX компоненты', 'Библиотека готовых компонентов: кнопки, формы, модалки, карточки', 'shadcn/ui + Tailwind', ARRAY['ui', 'components', 'design-system'], 'easy');

CREATE INDEX idx_ai_projects_status ON t_p82859479_labor_safety_app.ai_projects(status);
CREATE INDEX idx_ai_projects_created ON t_p82859479_labor_safety_app.ai_projects(created_at DESC);
CREATE INDEX idx_knowledge_category ON t_p82859479_labor_safety_app.ai_knowledge_base(category);
CREATE INDEX idx_knowledge_tags ON t_p82859479_labor_safety_app.ai_knowledge_base USING gin(tags);
