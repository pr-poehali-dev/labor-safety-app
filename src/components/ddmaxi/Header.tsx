import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  return (
    <header className="border-b border-blue-500/20 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DDMaxi SRS-II</h1>
            <p className="text-xs text-blue-300">Self-Reinforcement System</p>
          </div>
          <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">
            Активна
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-300">
            <Icon name="Activity" size={16} className="text-green-400" />
            <span>Система обучается</span>
          </div>
          
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
            <Icon name="Bell" size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
