import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0 p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-200 text-sm mb-1">Уровень обучения</p>
              <h3 className="text-3xl font-bold">87%</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Icon name="Brain" size={24} />
            </div>
          </div>
          <Progress value={87} className="h-2 bg-blue-900" />
          <p className="text-xs text-blue-200 mt-2">+12% за последнюю неделю</p>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-600 to-cyan-800 border-0 p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-cyan-200 text-sm mb-1">Точность предсказаний</p>
              <h3 className="text-3xl font-bold">94.3%</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Icon name="Target" size={24} />
            </div>
          </div>
          <Progress value={94} className="h-2 bg-cyan-900" />
          <p className="text-xs text-cyan-200 mt-2">Высокая точность</p>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0 p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-purple-200 text-sm mb-1">Обработано задач</p>
              <h3 className="text-3xl font-bold">1,247</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Icon name="Zap" size={24} />
            </div>
          </div>
          <Progress value={72} className="h-2 bg-purple-900" />
          <p className="text-xs text-purple-200 mt-2">+156 за сегодня</p>
        </Card>
      </div>

      <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 px-4 py-2 rounded-full text-sm mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Интеллектуальная система с самообучением</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            DDMaxi SRS-II
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Система адаптивного искусственного интеллекта с возможностями машинного обучения, 
            нейронных сетей и автономного принятия решений
          </p>
          
          <Button
            size="lg"
            onClick={() => navigate('/ai-builder')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg mb-8 shadow-lg shadow-purple-500/30"
          >
            <Icon name="Sparkles" size={24} className="mr-3" />
            Создать приложение с AI
            <Icon name="ArrowRight" size={24} className="ml-3" />
          </Button>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-blue-500/20">
              <Icon name="Cpu" size={16} className="inline mr-2 text-blue-400" />
              <span className="text-sm text-slate-300">Глубокое обучение</span>
            </div>
            <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-cyan-500/20">
              <Icon name="Network" size={16} className="inline mr-2 text-cyan-400" />
              <span className="text-sm text-slate-300">Нейронные сети</span>
            </div>
            <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-purple-500/20">
              <Icon name="TrendingUp" size={16} className="inline mr-2 text-purple-400" />
              <span className="text-sm text-slate-300">Самоадаптация</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Hero;