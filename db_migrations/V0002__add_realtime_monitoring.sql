-- Таблица для мониторинга обучения нейросетей
CREATE TABLE t_p82859479_labor_safety_app.neural_network_training (
    id SERIAL PRIMARY KEY,
    network_name VARCHAR(100) NOT NULL,
    epoch INTEGER NOT NULL,
    loss DECIMAL(10,6) NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    learning_rate DECIMAL(10,8) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'training',
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Таблица для критических событий и уведомлений
CREATE TABLE t_p82859479_labor_safety_app.critical_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    module_name VARCHAR(100),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- Вставка тестовых данных для обучения нейросетей
INSERT INTO t_p82859479_labor_safety_app.neural_network_training (network_name, epoch, loss, accuracy, learning_rate, status, timestamp) VALUES
('CNN-Security-Model', 1, 2.456, 45.2, 0.001, 'training', NOW() - INTERVAL '10 minutes'),
('CNN-Security-Model', 2, 1.823, 58.7, 0.001, 'training', NOW() - INTERVAL '9 minutes'),
('CNN-Security-Model', 3, 1.234, 72.3, 0.001, 'training', NOW() - INTERVAL '8 minutes'),
('CNN-Security-Model', 4, 0.892, 81.5, 0.001, 'training', NOW() - INTERVAL '7 minutes'),
('CNN-Security-Model', 5, 0.654, 87.2, 0.001, 'completed', NOW() - INTERVAL '6 minutes'),

('RNN-Medical-Predictor', 1, 3.123, 38.9, 0.0005, 'training', NOW() - INTERVAL '15 minutes'),
('RNN-Medical-Predictor', 2, 2.456, 52.1, 0.0005, 'training', NOW() - INTERVAL '14 minutes'),
('RNN-Medical-Predictor', 3, 1.789, 67.8, 0.0005, 'training', NOW() - INTERVAL '13 minutes'),
('RNN-Medical-Predictor', 4, 1.234, 78.4, 0.0005, 'training', NOW() - INTERVAL '12 minutes'),
('RNN-Medical-Predictor', 5, 0.987, 84.6, 0.0005, 'training', NOW() - INTERVAL '11 minutes'),
('RNN-Medical-Predictor', 6, 0.756, 89.3, 0.0005, 'training', NOW() - INTERVAL '10 minutes'),

('Transformer-Finance', 1, 2.891, 42.5, 0.0001, 'training', NOW() - INTERVAL '20 minutes'),
('Transformer-Finance', 2, 2.134, 56.3, 0.0001, 'training', NOW() - INTERVAL '18 minutes'),
('Transformer-Finance', 3, 1.567, 69.7, 0.0001, 'training', NOW() - INTERVAL '16 minutes'),
('Transformer-Finance', 4, 1.123, 79.8, 0.0001, 'training', NOW() - INTERVAL '14 minutes'),
('Transformer-Finance', 5, 0.834, 86.2, 0.0001, 'training', NOW() - INTERVAL '12 minutes'),
('Transformer-Finance', 6, 0.623, 91.5, 0.0001, 'training', NOW() - INTERVAL '10 minutes');

-- Вставка критических событий
INSERT INTO t_p82859479_labor_safety_app.critical_events (event_type, severity, title, description, module_name, is_read, created_at) VALUES
('anomaly_detected', 'high', 'Обнаружена аномалия в сети безопасности', 'Зафиксировано необычное поведение в модуле кибербезопасности. Требуется проверка.', 'Кибербезопасность', FALSE, NOW() - INTERVAL '5 minutes'),
('training_failed', 'critical', 'Сбой обучения модели', 'Процесс обучения RNN-Medical-Predictor прерван из-за ошибки памяти.', 'Медицинская диагностика', FALSE, NOW() - INTERVAL '15 minutes'),
('low_accuracy', 'medium', 'Низкая точность предсказаний', 'Точность модели робототехники упала ниже 70%. Рекомендуется дообучение.', 'Робототехника', TRUE, NOW() - INTERVAL '30 minutes'),
('resource_limit', 'high', 'Превышен лимит ресурсов', 'Использование GPU достигло 98%. Возможны задержки в обработке.', 'Промышленное производство', FALSE, NOW() - INTERVAL '2 minutes'),
('data_quality', 'medium', 'Проблема с качеством данных', 'Обнаружены пропущенные значения в 15% обучающей выборки.', 'Транспортная логистика', FALSE, NOW() - INTERVAL '45 minutes');

CREATE INDEX idx_nn_training_network ON t_p82859479_labor_safety_app.neural_network_training(network_name, timestamp);
CREATE INDEX idx_critical_events_created ON t_p82859479_labor_safety_app.critical_events(created_at DESC);
CREATE INDEX idx_critical_events_unread ON t_p82859479_labor_safety_app.critical_events(is_read) WHERE is_read = FALSE;
