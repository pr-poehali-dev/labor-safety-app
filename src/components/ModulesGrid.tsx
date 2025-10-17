import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Module {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

interface ModulesGridProps {
  modules: Module[];
}

const ModulesGrid = ({ modules }: ModulesGridProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Модули системы</CardTitle>
        <CardDescription>Быстрый доступ к основным функциям</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((module) => (
            <Button
              key={module.id}
              variant="outline"
              className="h-auto flex-col p-6 hover:bg-accent hover-scale"
            >
              <Icon name={module.icon} className={`${module.color} mb-3`} size={32} />
              <span className="font-semibold mb-1">{module.name}</span>
              <span className="text-xs text-muted-foreground">{module.count} активных</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulesGrid;
