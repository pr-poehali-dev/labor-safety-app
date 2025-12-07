import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const colorMap: { [key: string]: { color: string; bgColor: string } } = {
  'Кибербезопасность': { color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  'Медицинская диагностика': { color: 'text-red-500', bgColor: 'bg-red-500/10' },
  'Робототехника': { color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  'Финансовая аналитика': { color: 'text-green-500', bgColor: 'bg-green-500/10' },
  'Промышленное производство': { color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  'Транспортная логистика': { color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' }
};

const ModuleGrid = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/945fe55c-ad8b-42b6-9be6-085426bec028');
        const data = await response.json();
        
        const enrichedModules = data.modules?.map((m: any) => ({
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