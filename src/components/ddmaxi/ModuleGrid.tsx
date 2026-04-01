import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Module {
  id: number;
  title: string;
  description: string;
  status: string;
  tasks: number;
  icon: string;
  color: string;
  bgColor: string;
}

const colorMap: { [key: string]: { color: string; bgColor: string } } = {
  'Кибербезопасность': { color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  'Медицинская диагностика': { color: 'text-red-500', bgColor: 'bg-red-500/10' },
  'Робототехника': { color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  'Финансовая аналитика': { color: 'text-green-500', bgColor: 'bg-green-500/10' },
  'Промышленное производство': { color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  'Транспортная логистика': { color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' }
};

const moduleDetails: { [key: string]: { accuracy: number; speed: string; description: string; features: string[] } } = {
  'Кибербезопасность': {
    accuracy: 96.2,
    speed: '0.8ms',
    description: 'Модуль обнаружения и нейтрализации угроз в реальном времени. Использует глубокое обучение для идентификации аномалий в сетевом трафике.',
    features: ['Анализ сетевого трафика', 'Обнаружение вторжений', 'Анализ вредоносного ПО', 'Поведенческий анализ']
  },
  'Медицинская диагностика': {
    accuracy: 91.5,
    speed: '1.4ms',
    description: 'Система поддержки принятия медицинских решений на основе анализа медицинских изображений и клинических данных.',
    features: ['Анализ медицинских снимков', 'Диагностика патологий', 'Прогноз лечения', 'Анализ лабораторных данных']
  },
  'Робототехника': {
    accuracy: 91.8,
    speed: '1.1ms',
    description: 'Управление и обучение роботизированных систем с применением обучения с подкреплением.',
    features: ['Планирование траекторий', 'Захват объектов', 'Навигация', 'Взаимодействие с людьми']
  },
  'Финансовая аналитика': {
    accuracy: 93.5,
    speed: '0.9ms',
    description: 'Анализ финансовых рынков, прогнозирование котировок и управление рисками портфеля.',
    features: ['Прогноз котировок', 'Оценка рисков', 'Алгоритмическая торговля', 'Анализ настроений рынка']
  },
  'Промышленное производство': {
    accuracy: 88.4,
    speed: '1.6ms',
    description: 'Оптимизация производственных процессов и предиктивное техническое обслуживание оборудования.',
    features: ['Контроль качества', 'Предиктивное ТО', 'Оптимизация загрузки', 'Управление запасами']
  },
  'Транспортная логистика': {
    accuracy: 88.9,
    speed: '1.3ms',
    description: 'Оптимизация маршрутов доставки, управление флотом и прогнозирование спроса на логистику.',
    features: ['Оптимизация маршрутов', 'Управление флотом', 'Прогноз спроса', 'Отслеживание грузов']
  }
};

const ModuleGrid = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/945fe55c-ad8b-42b6-9be6-085426bec028');
        const data = await response.json();
        
        const enrichedModules = data.modules?.map((m: Module) => ({
          ...m,
          color: colorMap[m.title]?.color || 'text-blue-500',
          bgColor: colorMap[m.title]?.bgColor || 'bg-blue-500/10'
        })) || [];
        
        setModules(enrichedModules);
      } catch (error) {
        console.error('Ошибка загрузки модулей:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <Icon name="Loader2" size={48} className="animate-spin" />
      </div>
    );
  }

  const details = selectedModule ? moduleDetails[selectedModule.title] : null;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className="bg-slate-900/50 border-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer backdrop-blur-sm group hover:shadow-lg hover:shadow-blue-500/10"
            onClick={() => setSelectedModule(module)}
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
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Задач в обработке:</span>
                  <span className="text-white font-semibold">{module.tasks}</span>
                </div>
                {moduleDetails[module.title] && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-400">Точность:</span>
                      <span className="text-white font-semibold">{moduleDetails[module.title].accuracy}%</span>
                    </div>
                    <Progress value={moduleDetails[module.title].accuracy} className="h-1.5" />
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="Info" size={12} />
                  <span>Нажмите для подробностей</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedModule} onOpenChange={(open) => !open && setSelectedModule(null)}>
        <DialogContent className="bg-slate-900 border-blue-500/30 text-white max-w-lg">
          {selectedModule && details && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${selectedModule.bgColor} p-3 rounded-lg`}>
                    <Icon name={selectedModule.icon} size={28} className={selectedModule.color} />
                  </div>
                  <div>
                    <DialogTitle className="text-white text-xl">{selectedModule.title}</DialogTitle>
                    <Badge className={selectedModule.status === 'active' ? 'bg-green-500/20 text-green-300 border-green-500/30 mt-1' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 mt-1'}>
                      {selectedModule.status === 'active' ? '✅ Активен' : '🔄 Обучается'}
                    </Badge>
                  </div>
                </div>
                <DialogDescription className="text-slate-300 text-sm leading-relaxed">
                  {details.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-800/60 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-white">{details.accuracy}%</p>
                    <p className="text-xs text-slate-400 mt-1">Точность</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-white">{details.speed}</p>
                    <p className="text-xs text-slate-400 mt-1">Скорость</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold text-white">{selectedModule.tasks}</p>
                    <p className="text-xs text-slate-400 mt-1">Задач</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Производительность</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Точность модели</span>
                        <span className="text-white">{details.accuracy}%</span>
                      </div>
                      <Progress value={details.accuracy} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Возможности модуля</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {details.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                        <Icon name="CheckCircle" size={14} className="text-green-400 flex-shrink-0" />
                        <span className="text-xs text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setSelectedModule(null)}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Закрыть
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModuleGrid;
