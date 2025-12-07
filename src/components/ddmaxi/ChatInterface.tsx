import { useState, useEffect } from 'react';
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

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/d155a8ad-63a7-4192-a022-7ccf0144402e');
        const data = await response.json();
        
        if (data.messages && data.messages.length > 0) {
          const loadedMessages = data.messages.map((m: any) => ({
            id: m.id,
            text: m.text,
            sender: m.sender,
            timestamp: new Date(m.timestamp)
          }));
          setMessages(loadedMessages);
        } else {
          setMessages([{
            id: 1,
            text: 'Добро пожаловать! Я DDMaxi SRS-II, ваш интеллектуальный помощник с возможностями самообучения. Чем могу помочь?',
            sender: 'ai',
            timestamp: new Date()
          }]);
        }
      } catch (error) {
        console.error('Ошибка загрузки истории:', error);
        setMessages([{
          id: 1,
          text: 'Добро пожаловать! Я DDMaxi SRS-II, ваш интеллектуальный помощник с возможностями самообучения. Чем могу помочь?',
          sender: 'ai',
          timestamp: new Date()
        }]);
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
  }, []);

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

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    saveMessage(inputValue, 'user');
    setInputValue('');

    setTimeout(() => {
      const aiText = 'Анализирую ваш запрос с применением нейронных сетей и машинного обучения. Подготавливаю адаптивное решение...';
      const aiResponse: Message = {
        id: messages.length + 2,
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      saveMessage(aiText, 'ai');
    }, 1000);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Icon name="MessageSquare" size={24} className="text-blue-400" />
          Интеллектуальный помощник
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[500px] pr-4">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-400">
              <Icon name="Loader2" size={32} className="animate-spin" />
            </div>
          ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar className={`w-8 h-8 ${message.sender === 'ai' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-slate-700'}`}>
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
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          )}
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Задайте вопрос или опишите задачу..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
          />
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
            <Icon name="Send" size={18} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {['Анализ данных', 'Прогноз', 'Оптимизация', 'Безопасность'].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(suggestion)}
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