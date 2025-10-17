import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const stats = [
    { title: 'Активных сотрудников', value: '1,247', change: '+12%', trend: 'up', icon: 'Users' },
    { title: 'Открытых инцидентов', value: '3', change: '-45%', trend: 'down', icon: 'AlertTriangle' },
    { title: 'Проведено инструктажей', value: '89', change: '+23%', trend: 'up', icon: 'FileText' },
    { title: 'Уровень безопасности', value: '94%', change: '+8%', trend: 'up', icon: 'Shield' },
  ];

  const recentIncidents = [
    { id: 1, title: 'Нарушение на складе №3', severity: 'high', status: 'Расследование', date: '15.10.2025' },
    { id: 2, title: 'Просроченные СИЗ', severity: 'medium', status: 'В работе', date: '14.10.2025' },
    { id: 3, title: 'Отсутствие маркировки', severity: 'low', status: 'Закрыт', date: '12.10.2025' },
  ];

  const trainings = [
    { name: 'Пожарная безопасность', progress: 87, users: 156 },
    { name: 'Первая помощь', progress: 92, users: 203 },
    { name: 'Работа на высоте', progress: 65, users: 78 },
  ];

  const pricingPlans = [
    {
      name: 'Базовый',
      price: '9 900',
      period: 'мес',
      features: ['До 100 сотрудников', 'Базовые модули', 'Email поддержка', 'Облачное хранилище 10 ГБ'],
      popular: false,
    },
    {
      name: 'Профессиональный',
      price: '24 900',
      period: 'мес',
      features: ['До 500 сотрудников', 'Все модули', 'Приоритетная поддержка 24/7', 'Облачное хранилище 100 ГБ', 'API доступ', 'Кастомные отчеты'],
      popular: true,
    },
    {
      name: 'Корпоративный',
      price: '49 900',
      period: 'мес',
      features: ['Безлимитно сотрудников', 'Все модули + расширения', 'Персональный менеджер', 'Облачное хранилище 1 ТБ', 'Полный API', 'White Label', 'Интеграция с 1С'],
      popular: false,
    },
  ];

  const modules = [
    { id: 'audits', name: 'Аудиты', icon: 'ClipboardCheck', count: 45, color: 'text-blue-600' },
    { id: 'briefings', name: 'Инструктажи', icon: 'FileText', count: 89, color: 'text-green-600' },
    { id: 'incidents', name: 'Инциденты', icon: 'AlertTriangle', count: 3, color: 'text-red-600' },
    { id: 'ppe', name: 'СИЗ', icon: 'HardHat', count: 567, color: 'text-orange-600' },
    { id: 'training', name: 'Обучение', icon: 'GraduationCap', count: 12, color: 'text-purple-600' },
    { id: 'reports', name: 'Отчетность', icon: 'BarChart3', count: 28, color: 'text-indigo-600' },
    { id: 'documents', name: 'Документы', icon: 'FolderOpen', count: 234, color: 'text-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">АСУБТ Pro</h1>
              <p className="text-xs text-sidebar-foreground/60">Система безопасности труда</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', name: 'Дашборд', icon: 'LayoutDashboard' },
              { id: 'audits', name: 'Аудиты', icon: 'ClipboardCheck' },
              { id: 'briefings', name: 'Инструктажи', icon: 'FileText' },
              { id: 'incidents', name: 'Инциденты', icon: 'AlertTriangle' },
              { id: 'ppe', name: 'СИЗ', icon: 'HardHat' },
              { id: 'training', name: 'Обучение', icon: 'GraduationCap' },
              { id: 'reports', name: 'Отчетность', icon: 'BarChart3' },
              { id: 'documents', name: 'Документы', icon: 'FolderOpen' },
              { id: 'pricing', name: 'Подписки', icon: 'CreditCard' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  activeModule === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/80'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Иван Петров</p>
              <p className="text-xs text-sidebar-foreground/60">Администратор</p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Settings" size={16} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Настройки</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="User" className="mr-2" size={16} />
                      Профиль
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Bell" className="mr-2" size={16} />
                      Уведомления
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Lock" className="mr-2" size={16} />
                      Безопасность
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive">
                      <Icon name="LogOut" className="mr-2" size={16} />
                      Выйти
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </aside>

      <main className="ml-64 p-8">
        {activeModule === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Обзор системы</h2>
                <p className="text-muted-foreground mt-1">Текущее состояние безопасности труда на предприятии</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Icon name="Download" className="mr-2" size={16} />
                  Экспорт
                </Button>
                <Button>
                  <Icon name="Plus" className="mr-2" size={16} />
                  Создать отчет
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover-scale">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                      <Icon name={stat.icon} className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} size={20} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className={`text-xs mt-1 flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      <Icon name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
                      {stat.change} за месяц
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Последние инциденты</CardTitle>
                  <CardDescription>Требуют внимания и контроля</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div
                        className={`p-2 rounded-lg ${
                          incident.severity === 'high'
                            ? 'bg-red-50'
                            : incident.severity === 'medium'
                            ? 'bg-orange-50'
                            : 'bg-blue-50'
                        }`}
                      >
                        <Icon
                          name="AlertTriangle"
                          className={
                            incident.severity === 'high'
                              ? 'text-red-600'
                              : incident.severity === 'medium'
                              ? 'text-orange-600'
                              : 'text-blue-600'
                          }
                          size={20}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{incident.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={incident.severity === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {incident.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{incident.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Прогресс обучения</CardTitle>
                  <CardDescription>Активные программы обучения персонала</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {trainings.map((training, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{training.name}</p>
                        <span className="text-sm text-muted-foreground">{training.users} чел.</span>
                      </div>
                      <div className="space-y-1">
                        <Progress value={training.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground text-right">{training.progress}% завершено</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Быстрый доступ к модулям</CardTitle>
                <CardDescription>Основные функции системы АСУБТ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className="p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Icon name={module.icon} className={`${module.color} group-hover:scale-110 transition-transform`} size={24} />
                        <Badge variant="secondary">{module.count}</Badge>
                      </div>
                      <p className="font-medium text-sm">{module.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeModule === 'pricing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">Тарифные планы</h2>
              <p className="text-muted-foreground mt-2">Выберите оптимальный план для вашей организации</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mt-12">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-primary text-primary-foreground">Популярный</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">₽/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon name="Check" className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                          Выбрать план
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Оформление подписки: {plan.name}</DialogTitle>
                          <DialogDescription>
                            Заполните форму, и наш менеджер свяжется с вами в течение 1 часа
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <label className="text-sm font-medium">Название организации</label>
                            <input className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="ООО Компания" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <input className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="info@company.ru" type="email" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Телефон</label>
                            <input className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="+7 (999) 123-45-67" type="tel" />
                          </div>
                          <Button className="w-full">Отправить заявку</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-6xl mx-auto mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Корпоративные решения White Label</h3>
                    <p className="text-muted-foreground mb-6">
                      Получите полностью брендированную систему АСУБТ с вашим логотипом, цветами и доменом. 
                      Полный API доступ, персональная поддержка и возможность кастомизации под ваши бизнес-процессы.
                    </p>
                    <ul className="space-y-2 mb-6">
                      {['Ваш логотип и брендинг', 'Собственный домен', 'Расширенный API', 'SLA 99.9%', 'Персональный Success Manager'].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Icon name="Check" className="text-green-600" size={16} />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <Icon name="Phone" className="mr-2" size={16} />
                      Связаться с отделом продаж
                    </Button>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                        <Icon name="Zap" className="text-blue-600" size={32} />
                        <div>
                          <p className="font-semibold">Быстрый запуск</p>
                          <p className="text-sm text-muted-foreground">Внедрение за 2 недели</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                        <Icon name="Users" className="text-green-600" size={32} />
                        <div>
                          <p className="font-semibold">Обучение команды</p>
                          <p className="text-sm text-muted-foreground">Входит в стоимость</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                        <Icon name="Code" className="text-purple-600" size={32} />
                        <div>
                          <p className="font-semibold">Интеграции</p>
                          <p className="text-sm text-muted-foreground">1С, SAP, любые системы</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeModule !== 'dashboard' && activeModule !== 'pricing' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  {modules.find((m) => m.id === activeModule)?.name}
                </h2>
                <p className="text-muted-foreground mt-1">Управление и контроль процессов</p>
              </div>
              <Button>
                <Icon name="Plus" className="mr-2" size={16} />
                Создать
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="completed">Завершенные</TabsTrigger>
                <TabsTrigger value="archive">Архив</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Список записей</CardTitle>
                    <CardDescription>Все записи модуля {modules.find((m) => m.id === activeModule)?.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Icon name="Database" className="mx-auto text-muted-foreground mb-4" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Данные загружаются</h3>
                      <p className="text-muted-foreground mb-6">
                        Модуль {modules.find((m) => m.id === activeModule)?.name} содержит {modules.find((m) => m.id === activeModule)?.count} записей
                      </p>
                      <Button>
                        <Icon name="Plus" className="mr-2" size={16} />
                        Создать первую запись
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
