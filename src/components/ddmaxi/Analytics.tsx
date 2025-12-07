import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import * as XLSX from 'xlsx';

const Analytics = () => {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [moduleActivityData, setModuleActivityData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfResponse = await fetch('https://functions.poehali.dev/0f2393e5-eaaa-43a8-b070-df9a75a4f4da');
        const perfData = await perfResponse.json();
        setPerformanceData(perfData.data || []);

        const modulesResponse = await fetch('https://functions.poehali.dev/945fe55c-ad8b-42b6-9be6-085426bec028');
        const modulesData = await modulesResponse.json();
        
        const activityData = modulesData.modules?.map((m: any) => ({
          module: m.title,
          tasks: m.tasks,
          completed: Math.floor(m.tasks * 0.85),
          learning: Math.floor(m.tasks * 0.15)
        })) || [];
        
        setModuleActivityData(activityData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    const perfWS = XLSX.utils.json_to_sheet(performanceData);
    XLSX.utils.book_append_sheet(wb, perfWS, 'Производительность');
    
    const moduleWS = XLSX.utils.json_to_sheet(moduleActivityData);
    XLSX.utils.book_append_sheet(wb, moduleWS, 'Модули');
    
    XLSX.writeFile(wb, `DDMaxi_Analytics_${new Date().toISOString().split('T')[0]}.xlsx`);
  };
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Общая точность</CardDescription>
            <CardTitle className="text-3xl text-white">94.3%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-400">
              <Icon name="TrendingUp" size={16} className="mr-1" />
              <span>+2.1% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Скорость обработки</CardDescription>
            <CardTitle className="text-3xl text-white">1.2ms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-400">
              <Icon name="Zap" size={16} className="mr-1" />
              <span>Оптимально</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Активных моделей</CardDescription>
            <CardTitle className="text-3xl text-white">24</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-400">
              <Icon name="Brain" size={16} className="mr-1" />
              <span>6 обучаются</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400">Время работы</CardDescription>
            <CardTitle className="text-3xl text-white">99.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-400">
              <Icon name="CheckCircle" size={16} className="mr-1" />
              <span>Стабильно</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Производительность системы</CardTitle>
              <CardDescription className="text-slate-400">
                Динамика ключевых показателей за 24 часа
              </CardDescription>
            </div>
            <Button 
              onClick={exportToExcel} 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              <Icon name="Download" size={18} className="mr-2" />
              Экспорт в Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400">
              <Icon name="Loader2" size={32} className="animate-spin" />
            </div>
          ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} name="Точность" />
              <Line type="monotone" dataKey="speed" stroke="#06b6d4" strokeWidth={2} name="Скорость" />
              <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={2} name="Эффективность" />
            </LineChart>
          </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Активность модулей</CardTitle>
          <CardDescription className="text-slate-400">
            Распределение задач по модулям системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400">
              <Icon name="Loader2" size={32} className="animate-spin" />
            </div>
          ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moduleActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="module" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Выполнено" />
              <Bar dataKey="learning" fill="#f59e0b" name="В обучении" />
            </BarChart>
          </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;