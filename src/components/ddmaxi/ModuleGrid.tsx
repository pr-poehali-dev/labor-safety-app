import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const modules = [
  {
    id: 1,
    title: 'Кибербезопасность',
    description: 'Мониторинг угроз и защита систем в реальном времени',
    icon: 'Shield',
    status: 'active',
    tasks: 42,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 2,
    title: 'Медицинская диагностика',
    description: 'Анализ медицинских данных и прогнозирование',
    icon: 'HeartPulse',
    status: 'active',
    tasks: 28,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    id: 3,
    title: 'Робототехника',
    description: 'Управление роботизированными системами',
    icon: 'Bot',
    status: 'learning',
    tasks: 15,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 4,
    title: 'Финансовая аналитика',
    description: 'Прогнозирование рынков и автоматизация торговли',
    icon: 'TrendingUp',
    status: 'active',
    tasks: 67,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 5,
    title: 'Промышленное производство',
    description: 'Оптимизация процессов и контроль качества',
    icon: 'Factory',
    status: 'active',
    tasks: 51,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 6,
    title: 'Транспортная логистика',
    description: 'Маршрутизация и управление автономным транспортом',
    icon: 'Truck',
    status: 'learning',
    tasks: 33,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10'
  }
];

const ModuleGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <Card 
          key={module.id} 
          className="bg-slate-900/50 border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer backdrop-blur-sm group"
        >
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <div className={`${module.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon name={module.icon} size={24} className={module.color} />
              </div>
              <Badge 
                variant={module.status === 'active' ? 'default' : 'secondary'}
                className={module.status === 'active' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'}
              >
                {module.status === 'active' ? 'Активен' : 'Обучается'}
              </Badge>
            </div>
            <CardTitle className="text-white">{module.title}</CardTitle>
            <CardDescription className="text-slate-400">{module.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Задач в обработке:</span>
              <span className="text-white font-semibold">{module.tasks}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModuleGrid;
