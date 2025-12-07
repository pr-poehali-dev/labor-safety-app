import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '@/components/ui/icon';

interface NetworkData {
  epochs: Array<{
    epoch: number;
    loss: number;
    accuracy: number;
    learning_rate: number;
    status: string;
    time: string;
  }>;
  current_status: string;
  current_accuracy: number;
}

const RealtimeMonitoring = () => {
  const [networks, setNetworks] = useState<{ [key: string]: NetworkData }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/ce831a15-f504-4aa2-a13e-2d76d6c7e18b');
        const data = await response.json();
        setNetworks(data.networks || {});
      } catch (error) {
        console.error('Ошибка загрузки данных обучения:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
    const interval = setInterval(fetchTrainingData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <Icon name="Loader2" size={48} className="animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (status === 'training') return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
  };

  const getStatusText = (status: string) => {
    if (status === 'completed') return 'Завершено';
    if (status === 'training') return 'Обучается';
    return 'В ожидании';
  };

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(networks).map(([name, data]) => (
          <Card key={name} className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Icon name="Brain" size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm text-white">{name}</CardTitle>
                    <p className="text-xs text-slate-400 mt-1">
                      Эпоха {data.epochs[data.epochs.length - 1]?.epoch || 0}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(data.current_status)}>
                  {getStatusText(data.current_status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Точность</span>
                  <span className="text-white font-semibold">{data.current_accuracy.toFixed(1)}%</span>
                </div>
                <Progress value={data.current_accuracy} className="h-2" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Loss:</span>
                <span className="text-white">
                  {data.epochs[data.epochs.length - 1]?.loss.toFixed(3) || '0.000'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Learning Rate:</span>
                <span className="text-white">
                  {data.epochs[data.epochs.length - 1]?.learning_rate || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.entries(networks).map(([name, data]) => (
        <Card key={`chart-${name}`} className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">{name}</CardTitle>
            <CardDescription className="text-slate-400">
              Динамика обучения нейронной сети
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.epochs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="epoch" stroke="#94a3b8" label={{ value: 'Эпоха', position: 'insideBottom', offset: -5 }} />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="loss"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Loss"
                  dot={{ fill: '#ef4444', r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Accuracy (%)"
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RealtimeMonitoring;
