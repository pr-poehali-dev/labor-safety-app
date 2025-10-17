import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Shield" className="text-primary-foreground" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">АСУБТ Pro</h1>
            <p className="text-xs text-sidebar-foreground/60">Система безопасности труда</p>
          </div>
        </div>

        <nav className="space-y-1">
          {[
            { id: 'dashboard', name: 'Дашборд', icon: 'LayoutDashboard' },
            { id: 'audits', name: 'Аудиты', icon: 'ClipboardCheck' },
            { id: 'briefings', name: 'Инструктажи', icon: 'FileText' },
            { id: 'incidents', name: 'Инциденты', icon: 'AlertTriangle' },
            { id: 'ppe', name: 'СИЗ', icon: 'HardHat' },
            { id: 'training', name: 'Обучение', icon: 'GraduationCap' },
            { id: 'reports', name: 'Отчетность', icon: 'BarChart3' },
            { id: 'documents', name: 'Документы', icon: 'FolderOpen' },
            { id: 'pricing', name: 'Подписки', icon: 'CreditCard' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                activeModule === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/80'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
            <Icon name="User" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Иван Петров</p>
            <p className="text-xs text-sidebar-foreground/60">Администратор</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="Settings" size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Настройки</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="User" className="mr-2" size={16} />
                    Профиль
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Bell" className="mr-2" size={16} />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Lock" className="mr-2" size={16} />
                    Безопасность
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive">
                    <Icon name="LogOut" className="mr-2" size={16} />
                    Выйти
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
