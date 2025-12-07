import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '@/components/ui/icon';

const performanceData = [
  { time: '00:00', accuracy: 85, speed: 78, efficiency: 82 },
  { time: '04:00', accuracy: 87, speed: 81, efficiency: 85 },
  { time: '08:00', accuracy: 89, speed: 85, efficiency: 88 },
  { time: '12:00', accuracy: 91, speed: 88, efficiency: 90 },
  { time: '16:00', accuracy: 93, speed: 90, efficiency: 92 },
  { time: '20:00', accuracy: 94, speed: 92, efficiency: 94 }
];

const moduleActivityData = [
  { module: 'Кибербезопасность', tasks: 42, completed: 38, learning: 4 },
  { module: 'Медицина', tasks: 28, completed: 25, learning: 3 },
  { module: 'Робототехника', tasks: 15, completed: 10, learning: 5 },
  { module: 'Финансы', tasks: 67, completed: 63, learning: 4 },
  { module: 'Производство', tasks: 51, completed: 47, learning: 4 },
  { module: 'Транспорт', tasks: 33, completed: 28, learning: 5 }
];

const Analytics = () => {
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
          <CardTitle className="text-white">Производительность системы</CardTitle>
          <CardDescription className="text-slate-400">
            Динамика ключевых показателей за 24 часа
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
