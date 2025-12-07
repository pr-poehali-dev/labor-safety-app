import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const Settings = () => {
  const [learningRate, setLearningRate] = useState([75]);
  const [adaptationSpeed, setAdaptationSpeed] = useState([60]);

  return (
    <div className="grid gap-6 max-w-4xl">
      <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Settings" size={24} className="text-blue-400" />
            Параметры обучения
          </CardTitle>
          <CardDescription className="text-slate-400">
            Настройка алгоритмов машинного обучения и адаптации
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-learning" className="text-slate-300">
                Автоматическое обучение
              </Label>
              <Switch id="auto-learning" defaultChecked />
            </div>
            <p className="text-xs text-slate-500">
              Система будет автоматически обучаться на новых данных
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Скорость обучения: {learningRate}%</Label>
            <Slider
              value={learningRate}
              onValueChange={setLearningRate}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              Регулирует скорость адаптации нейронных сетей
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Скорость адаптации: {adaptationSpeed}%</Label>
            <Slider
              value={adaptationSpeed}
              onValueChange={setAdaptationSpeed}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              Определяет быстроту реакции системы на изменения
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-type" className="text-slate-300">
              Тип нейронной сети
            </Label>
            <Select defaultValue="deep">
              <SelectTrigger id="model-type" className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deep">Глубокое обучение (Deep Learning)</SelectItem>
                <SelectItem value="reinforcement">Обучение с подкреплением (RL)</SelectItem>
                <SelectItem value="transformer">Трансформер</SelectItem>
                <SelectItem value="hybrid">Гибридная модель</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Shield" size={24} className="text-green-400" />
            Безопасность и мониторинг
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="threat-detection" className="text-slate-300">
                Обнаружение угроз
              </Label>
              <Switch id="threat-detection" defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="anomaly-detection" className="text-slate-300">
                Детектирование аномалий
              </Label>
              <Switch id="anomaly-detection" defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup" className="text-slate-300">
                Автоматическое резервирование
              </Label>
              <Switch id="auto-backup" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="Cloud" size={24} className="text-purple-400" />
            Облачная архитектура
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cloud-provider" className="text-slate-300">
              Облачный провайдер
            </Label>
            <Select defaultValue="distributed">
              <SelectTrigger id="cloud-provider" className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distributed">Распределенные вычисления</SelectItem>
                <SelectItem value="aws">Amazon Web Services</SelectItem>
                <SelectItem value="azure">Microsoft Azure</SelectItem>
                <SelectItem value="gcp">Google Cloud Platform</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="microservices" className="text-slate-300">
                Микросервисная архитектура
              </Label>
              <Switch id="microservices" defaultChecked />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="scaling" className="text-slate-300">
                Автоматическое масштабирование
              </Label>
              <Switch id="scaling" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Icon name="Save" size={18} className="mr-2" />
          Сохранить настройки
        </Button>
        <Button variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">
          <Icon name="RotateCcw" size={18} className="mr-2" />
          Сбросить
        </Button>
      </div>
    </div>
  );
};

export default Settings;
