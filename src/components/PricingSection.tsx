import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
}

const PricingSection = ({ pricingPlans }: PricingSectionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Тарифные планы</h2>
        <p className="text-muted-foreground mt-1">Выберите оптимальный план для вашей организации</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <Card key={index} className={`relative hover-scale ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Популярный</Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">₽/{plan.period}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
                    <Icon name="Check" className="text-green-600 mt-0.5" size={16} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                Выбрать план
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Нужно индивидуальное решение?</h3>
              <p className="text-muted-foreground">Свяжитесь с нами для обсуждения корпоративного плана</p>
            </div>
            <Button size="lg">
              <Icon name="Phone" className="mr-2" size={16} />
              Связаться
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
