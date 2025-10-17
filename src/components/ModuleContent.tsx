import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ModuleContentProps {
  moduleId: string;
}

const ModuleContent = ({ moduleId }: ModuleContentProps) => {
  const moduleConfig: Record<string, { title: string; description: string; icon: string }> = {
    audits: {
      title: 'Аудиты безопасности',
      description: 'Планирование и проведение аудитов рабочих мест',
      icon: 'ClipboardCheck',
    },
    briefings: {
      title: 'Инструктажи',
      description: 'Управление инструктажами по охране труда',
      icon: 'FileText',
    },
    incidents: {
      title: 'Инциденты',
      description: 'Регистрация и расследование происшествий',
      icon: 'AlertTriangle',
    },
    ppe: {
      title: 'Средства индивидуальной защиты',
      description: 'Учет и выдача СИЗ сотрудникам',
      icon: 'HardHat',
    },
    training: {
      title: 'Обучение персонала',
      description: 'Организация и мониторинг обучения',
      icon: 'GraduationCap',
    },
    reports: {
      title: 'Отчетность',
      description: 'Формирование отчетов для контролирующих органов',
      icon: 'BarChart3',
    },
    documents: {
      title: 'Документы',
      description: 'Хранение и управление документацией',
      icon: 'FolderOpen',
    },
  };

  const config = moduleConfig[moduleId];

  if (!config) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={config.icon} className="text-primary" size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{config.title}</h2>
          <p className="text-muted-foreground mt-1">{config.description}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Активные задачи</CardTitle>
            <CardDescription>Требуют выполнения</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">12</div>
            <p className="text-sm text-muted-foreground">На этой неделе</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Завершено</CardTitle>
            <CardDescription>В текущем месяце</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">48</div>
            <p className="text-sm text-muted-foreground">+15% к прошлому месяцу</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader>
            <CardTitle>Просрочено</CardTitle>
            <CardDescription>Требуют внимания</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2 text-destructive">3</div>
            <p className="text-sm text-muted-foreground">Критично</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Список задач</CardTitle>
              <CardDescription>Управление и мониторинг</CardDescription>
            </div>
            <Button>
              <Icon name="Plus" className="mr-2" size={16} />
              Добавить
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Задача №{item}</p>
                    <p className="text-sm text-muted-foreground">Описание задачи {item}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleContent;
