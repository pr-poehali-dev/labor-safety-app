import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Incident {
  id: number;
  title: string;
  severity: string;
  status: string;
  date: string;
}

interface ChartsSectionProps {
  incidentsTrendData: Array<{ month: string; incidents: number; resolved: number; critical: number }>;
  recentIncidents: Incident[];
  safetyScoreData: Array<{ month: string; score: number }>;
  trainingCompletionData: Array<{ name: string; value: number; color: string }>;
  departmentSafetyData: Array<{ department: string; incidents: number; audits: number; compliance: number }>;
}

const ChartsSection = ({ 
  incidentsTrendData, 
  recentIncidents, 
  safetyScoreData, 
  trainingCompletionData,
  departmentSafetyData 
}: ChartsSectionProps) => {
  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'destructive';
    if (severity === 'medium') return 'default';
    return 'secondary';
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Динамика инцидентов</CardTitle>
            <CardDescription>Статистика по месяцам: всего, решено, критичные</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incidentsTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="incidents" fill="#3B82F6" name="Всего инцидентов" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#10B981" name="Решено" radius={[4, 4, 0, 0]} />
                <Bar dataKey="critical" fill="#EF4444" name="Критичные" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Последние инциденты</CardTitle>
            <CardDescription>Требуют внимания и контроля</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="border-l-4 border-l-primary pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-sm">{incident.title}</p>
                  <Badge variant={getSeverityColor(incident.severity)} className="ml-2">
                    {incident.severity === 'high' ? 'Высокий' : incident.severity === 'medium' ? 'Средний' : 'Низкий'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{incident.status}</span>
                  <span>{incident.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Уровень безопасности</CardTitle>
            <CardDescription>Общий показатель безопасности труда за 10 месяцев</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={safetyScoreData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  name="Уровень безопасности"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Завершение обучения</CardTitle>
            <CardDescription>Процент прохождения по программам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trainingCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trainingCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Показатели безопасности по отделам</CardTitle>
          <CardDescription>Сравнение инцидентов, аудитов и уровня соответствия</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={departmentSafetyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="department" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Инциденты" 
                dot={{ fill: '#EF4444', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="audits" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Аудиты" 
                dot={{ fill: '#3B82F6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Соответствие (%)" 
                dot={{ fill: '#10B981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default ChartsSection;
