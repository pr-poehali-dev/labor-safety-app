import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CriticalEvent {
  id: number;
  event_type: string;
  severity: string;
  title: string;
  description: string;
  module_name: string;
  is_read: boolean;
  created_at: string;
}

const NotificationsPanel = () => {
  const [events, setEvents] = useState<CriticalEvent[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const fetchEvents = async () => {
    try {
      const url = filter === 'unread'
        ? 'https://functions.poehali.dev/6928ca29-a01b-4def-aea5-df496828665e?unread_only=true'
        : 'https://functions.poehali.dev/6928ca29-a01b-4def-aea5-df496828665e';
      
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data.events || []);
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      console.error('Ошибка загрузки событий:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, [filter]);

  const markAsRead = async (eventId: number) => {
    try {
      await fetch('https://functions.poehali.dev/6928ca29-a01b-4def-aea5-df496828665e', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: eventId })
      });
      fetchEvents();
    } catch (error) {
      console.error('Ошибка отметки события:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'critical') return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (severity === 'high') return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    if (severity === 'medium') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  };

  const getSeverityText = (severity: string) => {
    if (severity === 'critical') return 'Критично';
    if (severity === 'high') return 'Высокий';
    if (severity === 'medium') return 'Средний';
    return 'Низкий';
  };

  const getEventIcon = (eventType: string) => {
    if (eventType === 'anomaly_detected') return 'AlertTriangle';
    if (eventType === 'training_failed') return 'XCircle';
    if (eventType === 'low_accuracy') return 'TrendingDown';
    if (eventType === 'resource_limit') return 'Cpu';
    if (eventType === 'data_quality') return 'Database';
    return 'Bell';
  };

  if (loading) {
    return (
      <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center text-slate-400">
            <Icon name="Loader2" size={32} className="animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Icon name="Bell" size={24} className="text-blue-400" />
              Критические события
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-slate-400">
              Мониторинг системных событий и аномалий
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-blue-600' : 'border-slate-700 text-slate-300'}
            >
              Все
            </Button>
            <Button
              size="sm"
              variant={filter === 'unread' ? 'default' : 'outline'}
              onClick={() => setFilter('unread')}
              className={filter === 'unread' ? 'bg-blue-600' : 'border-slate-700 text-slate-300'}
            >
              Непрочитанные
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Icon name="CheckCircle" size={48} className="mx-auto mb-4 text-green-500" />
                <p>Нет критических событий</p>
              </div>
            ) : (
              events.map((event) => (
                <Alert
                  key={event.id}
                  className={`bg-slate-800/50 border-slate-700 ${
                    !event.is_read ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      event.severity === 'critical' ? 'bg-red-500/20' :
                      event.severity === 'high' ? 'bg-orange-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      <Icon name={getEventIcon(event.event_type)} size={20} className={
                        event.severity === 'critical' ? 'text-red-400' :
                        event.severity === 'high' ? 'text-orange-400' :
                        'text-yellow-400'
                      } />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <AlertTitle className="text-white mb-1">{event.title}</AlertTitle>
                        <Badge variant="outline" className={getSeverityColor(event.severity)}>
                          {getSeverityText(event.severity)}
                        </Badge>
                      </div>
                      <AlertDescription className="text-slate-300 text-sm mb-2">
                        {event.description}
                      </AlertDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Icon name="Package" size={14} />
                            {event.module_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {new Date(event.created_at).toLocaleString('ru-RU', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        {!event.is_read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(event.id)}
                            className="text-xs text-blue-400 hover:text-blue-300"
                          >
                            <Icon name="Check" size={14} className="mr-1" />
                            Отметить
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Alert>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
