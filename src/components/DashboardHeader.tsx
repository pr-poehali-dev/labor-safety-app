import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardHeaderProps {
  periodFilter: string;
  setPeriodFilter: (filter: string) => void;
  exportToExcel: () => void;
}

const DashboardHeader = ({ periodFilter, setPeriodFilter, exportToExcel }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Обзор системы</h2>
        <p className="text-muted-foreground mt-1">Текущее состояние безопасности труда на предприятии</p>
      </div>
      <div className="flex gap-3 items-center">
        <Select value={periodFilter} onValueChange={setPeriodFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все время (10 мес)</SelectItem>
            <SelectItem value="half">Полугодие (6 мес)</SelectItem>
            <SelectItem value="quarter">Квартал (3 мес)</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={exportToExcel}>
          <Icon name="Download" className="mr-2" size={16} />
          Экспорт Excel
        </Button>
        <Button>
          <Icon name="Plus" className="mr-2" size={16} />
          Создать отчет
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
