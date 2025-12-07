-- Таблица версий проектов для отката изменений
CREATE TABLE IF NOT EXISTS t_p82859479_labor_safety_app.project_versions (
    version_id VARCHAR(50) PRIMARY KEY,
    project_id VARCHAR(50) NOT NULL,
    version_number INTEGER NOT NULL,
    description TEXT,
    changes JSONB,
    code_snapshot JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) DEFAULT 'DDMaxi AI'
);

-- Таблица галереи готовых проектов с примерами
CREATE TABLE IF NOT EXISTS t_p82859479_labor_safety_app.project_gallery (
    gallery_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    preview_image VARCHAR(500),
    demo_url VARCHAR(500),
    tech_stack JSONB,
    features TEXT[],
    complexity VARCHAR(20),
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_featured BOOLEAN DEFAULT false
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_versions_project ON t_p82859479_labor_safety_app.project_versions(project_id);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON t_p82859479_labor_safety_app.project_gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON t_p82859479_labor_safety_app.project_gallery(is_featured);

-- Добавляем примеры проектов в галерею
INSERT INTO t_p82859479_labor_safety_app.project_gallery 
(title, description, category, preview_image, demo_url, tech_stack, features, complexity, likes, views, is_featured) 
VALUES
('Современный лендинг IT-компании', 'Адаптивный одностраничный сайт с анимациями, формами обратной связи и интеграцией с CRM', 'landing', 'https://cdn.poehali.dev/projects/demo/landing-it.jpg', 'https://demo.ddmaxi-srs.dev/landing-it', '{"frontend": "React + TypeScript", "styling": "Tailwind CSS", "animations": "Framer Motion"}', ARRAY['Адаптивный дизайн', 'Форма заявки', 'Анимации при скролле', 'SEO-оптимизация'], 'easy', 142, 1847, true),

('Интернет-магазин электроники', 'Полнофункциональный магазин с корзиной, фильтрами, личным кабинетом и интеграцией платежей', 'ecommerce', 'https://cdn.poehali.dev/projects/demo/shop-electronics.jpg', 'https://demo.ddmaxi-srs.dev/shop-electronics', '{"frontend": "React + TypeScript", "backend": "Python API", "database": "PostgreSQL", "payments": "Stripe"}', ARRAY['Каталог с фильтрами', 'Корзина покупок', 'Онлайн-оплата', 'Личный кабинет', 'История заказов'], 'hard', 298, 3521, true),

('Дашборд аналитики продаж', 'Интерактивная панель с графиками, метриками и экспортом отчетов в Excel', 'dashboard', 'https://cdn.poehali.dev/projects/demo/analytics-dashboard.jpg', 'https://demo.ddmaxi-srs.dev/analytics', '{"frontend": "React + Recharts", "backend": "Python API", "database": "PostgreSQL"}', ARRAY['Интерактивные графики', 'Real-time данные', 'Экспорт в Excel', 'Фильтры по датам'], 'medium', 187, 2134, true),

('Корпоративный портал с авторизацией', 'Внутренний портал компании с ролями, документооборотом и чатом', 'business', 'https://cdn.poehali.dev/projects/demo/corporate-portal.jpg', 'https://demo.ddmaxi-srs.dev/corporate', '{"frontend": "React + TypeScript", "backend": "Python API", "database": "PostgreSQL", "auth": "JWT"}', ARRAY['Авторизация и роли', 'Документооборот', 'Внутренний чат', 'Уведомления'], 'hard', 156, 1923, false),

('Мессенджер в реальном времени', 'Чат-приложение с личными и групповыми чатами, файлами и эмодзи', 'chat', 'https://cdn.poehali.dev/projects/demo/messenger.jpg', 'https://demo.ddmaxi-srs.dev/messenger', '{"frontend": "React + TypeScript", "backend": "Python WebSocket", "database": "PostgreSQL"}', ARRAY['Real-time сообщения', 'Групповые чаты', 'Отправка файлов', 'Эмодзи и реакции'], 'medium', 221, 2876, true),

('CRM-система для продаж', 'Простая CRM с карточками клиентов, воронкой продаж и задачами', 'crm', 'https://cdn.poehali.dev/projects/demo/crm-sales.jpg', 'https://demo.ddmaxi-srs.dev/crm', '{"frontend": "React + TypeScript", "backend": "Python API", "database": "PostgreSQL"}', ARRAY['База клиентов', 'Воронка продаж', 'Календарь задач', 'Отчеты по продажам'], 'medium', 134, 1652, false),

('Планировщик задач с календарем', 'ToDo-приложение с календарем, приоритетами и напоминаниями', 'productivity', 'https://cdn.poehali.dev/projects/demo/todo-planner.jpg', 'https://demo.ddmaxi-srs.dev/todo', '{"frontend": "React + TypeScript", "database": "PostgreSQL"}', ARRAY['Календарь задач', 'Приоритеты', 'Категории', 'Уведомления'], 'easy', 189, 2341, false),

('Сервис бронирования номеров', 'Платформа для бронирования отелей с поиском, фильтрами и оплатой', 'booking', 'https://cdn.poehali.dev/projects/demo/hotel-booking.jpg', 'https://demo.ddmaxi-srs.dev/booking', '{"frontend": "React + TypeScript", "backend": "Python API", "database": "PostgreSQL", "payments": "Stripe"}', ARRAY['Поиск отелей', 'Календарь бронирований', 'Онлайн-оплата', 'Отзывы гостей'], 'hard', 267, 3124, true),

('Блог-платформа с редактором', 'Современный блог с Markdown-редактором, тегами и комментариями', 'blog', 'https://cdn.poehali.dev/projects/demo/blog-platform.jpg', 'https://demo.ddmaxi-srs.dev/blog', '{"frontend": "React + TypeScript", "backend": "Python API", "database": "PostgreSQL"}', ARRAY['Markdown редактор', 'Теги и категории', 'Комментарии', 'SEO-оптимизация'], 'medium', 176, 2198, false),

('Фитнес-трекер с прогрессом', 'Приложение для отслеживания тренировок, питания и прогресса', 'fitness', 'https://cdn.poehali.dev/projects/demo/fitness-tracker.jpg', 'https://demo.ddmaxi-srs.dev/fitness', '{"frontend": "React + TypeScript", "backend": "Python API", "database": "PostgreSQL"}', ARRAY['Дневник тренировок', 'Калькулятор калорий', 'Графики прогресса', 'План тренировок'], 'medium', 203, 2567, false);
