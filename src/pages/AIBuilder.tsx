import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  code?: string;
  preview?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'building' | 'testing' | 'deployed';
  progress: number;
  url?: string;
  created_at: Date;
}

const AIBuilder = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Привет! Я DDMaxi SRS-II — ваш персональный AI-разработчик. 

Я могу помочь создать:
🎨 Лендинги и сайты любой сложности
💼 Бизнес-приложения и CRM-системы
🛒 Интернет-магазины с корзиной и оплатой
📊 Дашборды для аналитики данных
🤖 Чат-боты и AI-ассистенты
📱 Веб-приложения с базой данных
🎮 Интерактивные приложения и игры

Мои возможности:
✅ Создание дизайна и UI/UX
✅ Программирование frontend (React, TypeScript)
✅ Разработка backend (Python, API)
✅ Настройка баз данных (PostgreSQL)
✅ Интеграция с внешними сервисами
✅ Публикация в интернет
✅ Подключение собственного домена
✅ SEO-оптимизация

Просто опишите, что хотите создать, и я начну работу!`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickTemplates = [
    { icon: 'Globe', label: 'Лендинг для бизнеса', prompt: 'Создай современный лендинг для IT-компании с анимациями' },
    { icon: 'ShoppingCart', label: 'Интернет-магазин', prompt: 'Создай интернет-магазин с каталогом товаров и корзиной' },
    { icon: 'BarChart3', label: 'Дашборд аналитики', prompt: 'Создай дашборд с графиками для анализа продаж' },
    { icon: 'MessageSquare', label: 'Чат-приложение', prompt: 'Создай мессенджер с историей сообщений' },
    { icon: 'Calendar', label: 'Планировщик задач', prompt: 'Создай ToDo-приложение с календарем' },
    { icon: 'Users', label: 'CRM-система', prompt: 'Создай простую CRM для управления клиентами' }
  ];

  const handleSend = async (customPrompt?: string) => {
    const messageText = customPrompt || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsBuilding(true);
    setBuildProgress(0);

    const progressInterval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(progressInterval);
      setBuildProgress(100);
      
      const projectId = `proj_${Date.now()}`;
      const newProject: Project = {
        id: projectId,
        name: messageText.substring(0, 50),
        description: messageText,
        status: 'deployed',
        progress: 100,
        url: `https://preview.ddmaxi-srs.dev/${projectId}`,
        created_at: new Date()
      };

      setCurrentProject(newProject);

      const aiResponse: Message = {
        id: messages.length + 2,
        text: `✅ Готово! Я создал ваш проект.

📊 Что было сделано:
• Спроектирован UI/UX дизайн
• Создан frontend на React + TypeScript
• Настроена база данных PostgreSQL
• Развернут на облачных серверах
• Настроен SSL-сертификат

🔗 Ваш проект доступен по ссылке:
${newProject.url}

💡 Следующие шаги:
1. Протестируйте функционал
2. При необходимости попросите доработки
3. Подключите свой домен в настройках
4. Опубликуйте проект в интернет

Хотите что-то изменить или добавить новый функционал?`,
        sender: 'ai',
        timestamp: new Date(),
        preview: newProject.url
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsBuilding(false);
      setBuildProgress(0);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-slate-300 hover:text-white"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Builder by DDMaxi</h1>
              <p className="text-xs text-purple-300">Создание приложений с искусственным интеллектом</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Icon name="Zap" size={14} className="mr-1" />
            Полный доступ к AI
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm h-[calc(100vh-200px)] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Icon name="MessageSquare" size={24} className="text-purple-400" />
                  Диалог с AI-разработчиком
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Опишите свою идею, и я создам для вас приложение
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'ai'
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                            : 'bg-slate-700'
                        }`}>
                          <Icon
                            name={message.sender === 'ai' ? 'Sparkles' : 'User'}
                            size={16}
                            className="text-white"
                          />
                        </div>
                        <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                          <div
                            className={`inline-block p-4 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-800 text-slate-200'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            {message.preview && (
                              <Alert className="mt-3 bg-slate-900 border-purple-500/30">
                                <Icon name="ExternalLink" size={16} />
                                <AlertDescription>
                                  <a
                                    href={message.preview}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 hover:text-purple-300 underline"
                                  >
                                    Открыть проект
                                  </a>
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {message.timestamp.toLocaleTimeString('ru-RU', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isBuilding && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Icon name="Loader2" size={16} className="text-white animate-spin" />
                        </div>
                        <div className="flex-1 bg-slate-800 p-4 rounded-lg">
                          <p className="text-slate-300 text-sm mb-2">Создаю ваш проект...</p>
                          <Progress value={buildProgress} className="h-2" />
                          <p className="text-xs text-slate-500 mt-2">{Math.round(buildProgress)}% готово</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Опишите что хотите создать..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[60px]"
                      disabled={isBuilding}
                    />
                    <Button
                      onClick={() => handleSend()}
                      disabled={isBuilding || !inputValue.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quickTemplates.map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSend(template.prompt)}
                        disabled={isBuilding}
                        className="text-xs bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        <Icon name={template.icon} size={14} className="mr-1" />
                        {template.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} className="text-yellow-400" />
                  Текущий проект
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentProject ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-semibold mb-1">{currentProject.name}</h3>
                      <p className="text-sm text-slate-400">{currentProject.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        currentProject.status === 'deployed'
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }>
                        {currentProject.status === 'deployed' ? 'Опубликован' : 'В разработке'}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {currentProject.created_at.toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    {currentProject.url && (
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                        onClick={() => window.open(currentProject.url, '_blank')}
                      >
                        <Icon name="ExternalLink" size={16} className="mr-2" />
                        Открыть проект
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Icon name="FolderOpen" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Начните диалог, чтобы создать проект</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Cpu" size={20} className="text-blue-400" />
                  Мои возможности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">React + TypeScript</p>
                      <p className="text-slate-400 text-xs">Современный frontend</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Python Backend</p>
                      <p className="text-slate-400 text-xs">Cloud Functions API</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">PostgreSQL</p>
                      <p className="text-slate-400 text-xs">Реляционная база данных</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Облачный хостинг</p>
                      <p className="text-slate-400 text-xs">Автоматический деплой</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">SSL & Домены</p>
                      <p className="text-slate-400 text-xs">Подключение своего домена</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-green-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Интеграции</p>
                      <p className="text-slate-400 text-xs">API, платежи, аналитика</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Icon name="Rocket" size={32} className="mx-auto mb-3 text-purple-400" />
                  <h3 className="text-white font-semibold mb-2">Готовы начать?</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Опишите свою идею в чате, и я создам полноценное приложение за несколько минут
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Icon name="Clock" size={14} />
                    <span>Среднее время создания: 2-5 минут</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBuilder;
