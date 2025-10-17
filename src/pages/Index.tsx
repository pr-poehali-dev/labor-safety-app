import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import StatsCards from '@/components/StatsCards';
import ChartsSection from '@/components/ChartsSection';
import ModulesGrid from '@/components/ModulesGrid';
import PricingSection from '@/components/PricingSection';
import ModuleContent from '@/components/ModuleContent';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [periodFilter, setPeriodFilter] = useState('all');

  const stats = [
    { title: 'Активных сотрудников', value: '1,247', change: '+12%', trend: 'up', icon: 'Users' },
    { title: 'Открытых инцидентов', value: '3', change: '-45%', trend: 'down', icon: 'AlertTriangle' },
    { title: 'Проведено инструктажей', value: '89', change: '+23%', trend: 'up', icon: 'FileText' },
    { title: 'Уровень безопасности', value: '94%', change: '+8%', trend: 'up', icon: 'Shield' },
  ];

  const recentIncidents = [
    { id: 1, title: 'Нарушение на складе №3', severity: 'high', status: 'Расследование', date: '15.10.2025' },
    { id: 2, title: 'Просроченные СИЗ', severity: 'medium', status: 'В работе', date: '14.10.2025' },
    { id: 3, title: 'Отсутствие маркировки', severity: 'low', status: 'Закрыт', date: '12.10.2025' },
  ];

  const pricingPlans = [
    {
      name: 'Базовый',
      price: '9 900',
      period: 'мес',
      features: ['До 100 сотрудников', 'Базовые модули', 'Email поддержка', 'Облачное хранилище 10 ГБ'],
      popular: false,
    },
    {
      name: 'Профессиональный',
      price: '24 900',
      period: 'мес',
      features: ['До 500 сотрудников', 'Все модули', 'Приоритетная поддержка 24/7', 'Облачное хранилище 100 ГБ', 'API доступ', 'Кастомные отчеты'],
      popular: true,
    },
    {
      name: 'Корпоративный',
      price: '49 900',
      period: 'мес',
      features: ['Безлимитно сотрудников', 'Все модули + расширения', 'Персональный менеджер', 'Облачное хранилище 1 ТБ', 'Полный API', 'White Label', 'Интеграция с 1С'],
      popular: false,
    },
  ];

  const modules = [
    { id: 'audits', name: 'Аудиты', icon: 'ClipboardCheck', count: 45, color: 'text-blue-600' },
    { id: 'briefings', name: 'Инструктажи', icon: 'FileText', count: 89, color: 'text-green-600' },
    { id: 'incidents', name: 'Инциденты', icon: 'AlertTriangle', count: 3, color: 'text-red-600' },
    { id: 'ppe', name: 'СИЗ', icon: 'HardHat', count: 567, color: 'text-orange-600' },
    { id: 'training', name: 'Обучение', icon: 'GraduationCap', count: 12, color: 'text-purple-600' },
    { id: 'reports', name: 'Отчетность', icon: 'BarChart3', count: 28, color: 'text-indigo-600' },
    { id: 'documents', name: 'Документы', icon: 'FolderOpen', count: 234, color: 'text-teal-600' },
  ];

  const allIncidentsTrendData = [
    { month: 'Янв', incidents: 12, resolved: 10, critical: 2 },
    { month: 'Фев', incidents: 8, resolved: 7, critical: 1 },
    { month: 'Мар', incidents: 15, resolved: 12, critical: 3 },
    { month: 'Апр', incidents: 6, resolved: 6, critical: 0 },
    { month: 'Май', incidents: 10, resolved: 8, critical: 2 },
    { month: 'Июн', incidents: 4, resolved: 4, critical: 0 },
    { month: 'Июл', incidents: 7, resolved: 6, critical: 1 },
    { month: 'Авг', incidents: 5, resolved: 5, critical: 0 },
    { month: 'Сен', incidents: 9, resolved: 8, critical: 1 },
    { month: 'Окт', incidents: 3, resolved: 2, critical: 1 },
  ];

  const allSafetyScoreData = [
    { month: 'Янв', score: 78 },
    { month: 'Фев', score: 82 },
    { month: 'Мар', score: 80 },
    { month: 'Апр', score: 86 },
    { month: 'Май', score: 88 },
    { month: 'Июн', score: 91 },
    { month: 'Июл', score: 89 },
    { month: 'Авг', score: 92 },
    { month: 'Сен', score: 93 },
    { month: 'Окт', score: 94 },
  ];

  const incidentsTrendData = useMemo(() => {
    if (periodFilter === 'all') return allIncidentsTrendData;
    if (periodFilter === 'quarter') return allIncidentsTrendData.slice(-3);
    if (periodFilter === 'half') return allIncidentsTrendData.slice(-6);
    return allIncidentsTrendData;
  }, [periodFilter]);

  const safetyScoreData = useMemo(() => {
    if (periodFilter === 'all') return allSafetyScoreData;
    if (periodFilter === 'quarter') return allSafetyScoreData.slice(-3);
    if (periodFilter === 'half') return allSafetyScoreData.slice(-6);
    return allSafetyScoreData;
  }, [periodFilter]);

  const trainingCompletionData = [
    { name: 'Пожарная безопасность', value: 87, color: '#EF4444' },
    { name: 'Первая помощь', value: 92, color: '#10B981' },
    { name: 'Работа на высоте', value: 65, color: '#F59E0B' },
    { name: 'Электробезопасность', value: 78, color: '#3B82F6' },
  ];

  const departmentSafetyData = [
    { department: 'Производство', incidents: 8, audits: 15, compliance: 92 },
    { department: 'Склад', incidents: 5, audits: 12, compliance: 88 },
    { department: 'Офис', incidents: 1, audits: 8, compliance: 98 },
    { department: 'Логистика', incidents: 6, audits: 10, compliance: 85 },
    { department: 'Лаборатория', incidents: 2, audits: 14, compliance: 95 },
  ];

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const incidentsWS = XLSX.utils.json_to_sheet(incidentsTrendData);
    XLSX.utils.book_append_sheet(wb, incidentsWS, 'Инциденты');

    const safetyWS = XLSX.utils.json_to_sheet(safetyScoreData);
    XLSX.utils.book_append_sheet(wb, safetyWS, 'Уровень безопасности');

    const trainingWS = XLSX.utils.json_to_sheet(trainingCompletionData);
    XLSX.utils.book_append_sheet(wb, trainingWS, 'Обучение');

    const departmentWS = XLSX.utils.json_to_sheet(departmentSafetyData);
    XLSX.utils.book_append_sheet(wb, departmentWS, 'Отделы');

    const statsData = stats.map(s => ({
      'Показатель': s.title,
      'Значение': s.value,
      'Изменение': s.change
    }));
    const statsWS = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(wb, statsWS, 'Общая статистика');

    XLSX.writeFile(wb, `АСУБТ_Отчет_${new Date().toLocaleDateString('ru-RU')}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      <main className="ml-64 p-8">
        {activeModule === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            <DashboardHeader 
              periodFilter={periodFilter} 
              setPeriodFilter={setPeriodFilter} 
              exportToExcel={exportToExcel} 
            />

            <StatsCards stats={stats} />

            <ChartsSection
              incidentsTrendData={incidentsTrendData}
              recentIncidents={recentIncidents}
              safetyScoreData={safetyScoreData}
              trainingCompletionData={trainingCompletionData}
              departmentSafetyData={departmentSafetyData}
            />

            <ModulesGrid modules={modules} />
          </div>
        )}

        {activeModule === 'pricing' && <PricingSection pricingPlans={pricingPlans} />}

        {['audits', 'briefings', 'incidents', 'ppe', 'training', 'reports', 'documents'].includes(activeModule) && (
          <ModuleContent moduleId={activeModule} />
        )}
      </main>
    </div>
  );
};

export default Index;
