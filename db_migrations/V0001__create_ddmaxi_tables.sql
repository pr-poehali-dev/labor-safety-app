-- Таблица для хранения истории производительности системы
CREATE TABLE t_p82859479_labor_safety_app.system_performance (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    accuracy DECIMAL(5,2) NOT NULL,
    speed DECIMAL(5,2) NOT NULL,
    efficiency DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Таблица для модулей системы
CREATE TABLE t_p82859479_labor_safety_app.modules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    tasks_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Таблица для истории чата
CREATE TABLE t_p82859479_labor_safety_app.chat_history (
    id SERIAL PRIMARY KEY,
    message_text TEXT NOT NULL,
    sender VARCHAR(10) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Таблица для активности модулей
CREATE TABLE t_p82859479_labor_safety_app.module_activity (
    id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES t_p82859479_labor_safety_app.modules(id),
    tasks INTEGER NOT NULL DEFAULT 0,
    completed INTEGER NOT NULL DEFAULT 0,
    learning INTEGER NOT NULL DEFAULT 0,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Вставка начальных данных для модулей
INSERT INTO t_p82859479_labor_safety_app.modules (name, description, icon, status, tasks_count) VALUES
('Кибербезопасность', 'Мониторинг угроз и защита систем в реальном времени', 'Shield', 'active', 42),
('Медицинская диагностика', 'Анализ медицинских данных и прогнозирование', 'HeartPulse', 'active', 28),
('Робототехника', 'Управление роботизированными системами', 'Bot', 'learning', 15),
('Финансовая аналитика', 'Прогнозирование рынков и автоматизация торговли', 'TrendingUp', 'active', 67),
('Промышленное производство', 'Оптимизация процессов и контроль качества', 'Factory', 'active', 51),
('Транспортная логистика', 'Маршрутизация и управление автономным транспортом', 'Truck', 'learning', 33);

-- Вставка начальных данных производительности
INSERT INTO t_p82859479_labor_safety_app.system_performance (timestamp, accuracy, speed, efficiency) VALUES
(NOW() - INTERVAL '20 hours', 85, 78, 82),
(NOW() - INTERVAL '16 hours', 87, 81, 85),
(NOW() - INTERVAL '12 hours', 89, 85, 88),
(NOW() - INTERVAL '8 hours', 91, 88, 90),
(NOW() - INTERVAL '4 hours', 93, 90, 92),
(NOW(), 94, 92, 94);

CREATE INDEX idx_performance_timestamp ON t_p82859479_labor_safety_app.system_performance(timestamp);
CREATE INDEX idx_chat_timestamp ON t_p82859479_labor_safety_app.chat_history(timestamp);
CREATE INDEX idx_module_activity_recorded ON t_p82859479_labor_safety_app.module_activity(recorded_at);
