import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/ddmaxi/Header';
import Hero from '@/components/ddmaxi/Hero';
import ModuleGrid from '@/components/ddmaxi/ModuleGrid';
import ChatInterface from '@/components/ddmaxi/ChatInterface';
import Analytics from '@/components/ddmaxi/Analytics';
import Settings from '@/components/ddmaxi/Settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Header />
      
      {activeTab === 'dashboard' && <Hero />}
      
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-blue-500/20">
            <TabsTrigger value="dashboard">Панель управления</TabsTrigger>
            <TabsTrigger value="assistant">Помощник</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <ModuleGrid />
          </TabsContent>

          <TabsContent value="assistant" className="mt-6">
            <Card className="bg-slate-900/50 border-blue-500/20 backdrop-blur-sm">
              <ChatInterface />
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Analytics />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
