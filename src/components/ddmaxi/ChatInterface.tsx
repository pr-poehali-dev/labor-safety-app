import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AI_RESPONSES: Record<string, string> = {
  'анализ данных': `📊 **Анализ данных** — одна из ключевых функций DDMaxi SRS-II.

Система выполняет:
• Многомерный статистический анализ в реальном времени
• Выявление скрытых паттернов с точностью 94.3%
• Кластеризацию и классификацию данных
• Прогностическое моделирование на 30/90/365 дней

Хотите запустить анализ по конкретному набору данных?`,
  'прогноз': `🔮 **Прогностические модели** DDMaxi SRS-II:

Доступные горизонты прогнозирования:
• Краткосрочный (1–7 дней) — точность 96.1%
• Среднесрочный (1–3 месяца) — точность 91.8%
• Долгосрочный (6–12 месяцев) — точность 87.2%

Используемые алгоритмы: LSTM, Transformer, Ensemble Methods.

Для какой области требуется прогноз?`,
  'оптимизация': `⚡ **Оптимизация** системных процессов:

Текущие показатели:
• Скорость обработки: 1.2ms (на 34% быстрее базовой)
• Использование памяти: 67% (оптимально)
• Параллельных потоков: 48
• Эффективность алгоритмов: 89.4%

Активированы: Gradient Descent, Adam Optimizer, Learning Rate Scheduling.

Что именно нужно оптимизировать?`,
  'безопасность': `🛡️ **Система безопасности** DDMaxi SRS-II:

Активные модули защиты:
• Обнаружение аномалий — ✅ Активно
• Мониторинг угроз — ✅ Активно  
• Шифрование данных AES-256 — ✅ Активно
• Контроль доступа — ✅ Активно

За последние 24 часа:
• Выявлено угроз: 3 (все нейтрализованы)
• Попыток несанкционированного доступа: 0
• Уровень защиты: Максимальный

Нужна дополнительная информация по безопасности?`,
};

const getAIResponse = (userText: string): string => {
  const lower = userText.toLowerCase();
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (lower.includes(key)) return response;
  }

  if (lower.includes('привет') || lower.includes('здравствуй') || lower.includes('добрый')) {
    return `👋 Привет! Рад вас видеть!

Я DDMaxi SRS-II — интеллектуальная система с самообучением. 

Чем могу помочь сегодня?
• 📊 Анализ данных
• 🔮 Прогнозирование  
• ⚡ Оптимизация процессов
• 🛡️ Вопросы безопасности

Просто напишите свой вопрос!`;
  }

  if (lower.includes('статус') || lower.includes('состояние') || lower.includes('работа')) {
    return `✅ **Статус системы DDMaxi SRS-II:**

🟢 Все системы работают нормально

Текущие показатели:
• Уровень обучения: 87% (+12% за неделю)
• Точность предсказаний: 94.3%
• Обработано задач сегодня: 1,247
• Активных модулей: 6/6
• Время безотказной работы: 99.8%

Нейронные сети: обучаются в фоновом режиме.`;
  }

  if (lower.includes('модул') || lower.includes('нейрон') || lower.includes('сет')) {
    return `🧠 **Активные модули нейронных сетей:**

1. 🔒 **Кибербезопасность** — Активен (точность 96.2%)
2. 🏥 **Медицинская диагностика** — Обучается (эпоха 47/100)
3. 🤖 **Робототехника** — Активен (точность 91.8%)
4. 📈 **Финансовая аналитика** — Активен (точность 93.5%)
5. 🏭 **Промышленное производство** — Обучается (эпоха 23/100)
6. 🚚 **Транспортная логистика** — Активен (точность 88.9%)

Хотите подробности по конкретному модулю?`;
  }

  return `🤖 Анализирую ваш запрос: "${userText}"

Используемые технологии:
• Трансформерная архитектура (BERT-based)
• Контекстный анализ с глубиной 512 токенов
• Многоуровневое семантическое понимание

💡 Рекомендации на основе анализа:
• Задача классифицирована как: информационный запрос
• Релевантность данных: высокая
• Уверенность ответа: 89.4%

Если хотите уточнить запрос — я готов помочь более детально!`;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/d155a8ad-63a7-4192-a022-7ccf0144402e');
        const data = await response.json();
        
        if (data.messages && data.messages.length > 0) {
          const loadedMessages = data.messages.map((m: { id: number; text: string; sender: 'user' | 'ai'; timestamp: string }) => ({
            id: m.id,
            text: m.text,
            sender: m.sender,
            timestamp: new Date(m.timestamp)
          }));
          setMessages(loadedMessages);
        } else {
          setMessages([{
            id: 1,
            text: 'Добро пожаловать! Я DDMaxi SRS-II — ваш интеллектуальный помощник с возможностями самообучения.\n\nМогу помочь с анализом данных, прогнозированием, оптимизацией и вопросами безопасности. Чем могу помочь?',
            sender: 'ai',
            timestamp: new Date()
          }]);
        }
      } catch (error) {
        console.error('Ошибка загрузки истории:', error);
        setMessages([{
          id: 1,
          text: 'Добро пожаловать! Я DDMaxi SRS-II — ваш интеллектуальный помощник с возможностями самообучения.\n\nМогу помочь с анализом данных, прогнозированием, оптимизацией и вопросами безопасности. Чем могу помочь?',
          sender: 'ai',
          timestamp: new Date()
        }]);
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const saveMessage = async (text: string, sender: 'user' | 'ai') => {
    try {
      await fetch('https://functions.poehali.dev/d155a8ad-63a7-4192-a022-7ccf0144402e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_text: text, sender })
      });
    } catch (error) {
      console.error('Ошибка сохранения сообщения:', error);
    }
  };

  const handleSend = async (customText?: string) => {
    const text = customText || inputValue;
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    saveMessage(text, 'user');
    setInputValue('');
    setIsTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const aiText = getAIResponse(text);
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      saveMessage(aiText, 'ai');
      setIsTyping(false);
    }, delay);
  };

  const suggestions = ['Анализ данных', 'Прогноз', 'Оптимизация', 'Безопасность', 'Статус системы', 'Модули'];

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon name="MessageSquare" size={24} className="text-blue-400" />
          Интеллектуальный помощник
          {isTyping && (
            <span className="text-sm font-normal text-slate-400 flex items-center gap-1">
              <Icon name="Loader2" size={14} className="animate-spin" />
              печатает...
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[500px] pr-4" ref={scrollRef}>
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-400">
              <Icon name="Loader2" size={32} className="animate-spin" />
            </div>
          ) : (
            <div className="space-y-4 pb-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className={`w-8 h-8 flex-shrink-0 ${message.sender === 'ai' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-slate-700'}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      {message.sender === 'ai' ? (
                        <Icon name="Brain" size={16} className="text-white" />
                      ) : (
                        <Icon name="User" size={16} className="text-white" />
                      )}
                    </div>
                  </Avatar>
                  <div
                    className={`flex-1 p-4 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500">
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="Brain" size={16} className="text-white" />
                    </div>
                  </Avatar>
                  <div className="bg-slate-800 text-slate-400 p-4 rounded-lg flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Задайте вопрос или опишите задачу..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSend()}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isTyping || !inputValue.trim()}
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => handleSend(suggestion)}
              disabled={isTyping}
              className="text-xs bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </CardContent>
    </>
  );
};

export default ChatInterface;