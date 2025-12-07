import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface GalleryProject {
  gallery_id: number;
  title: string;
  description: string;
  category: string;
  preview_image: string;
  demo_url: string;
  tech_stack: {
    frontend?: string;
    backend?: string;
    database?: string;
    [key: string]: string | undefined;
  };
  features: string[];
  complexity: string;
  likes: number;
  views: number;
  is_featured: boolean;
}

const ProjectGallery = () => {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<GalleryProject[]>([]);
  const [categories, setCategories] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedCategory, searchQuery]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/5531f8cb-e2e2-4c73-b83f-68fa08706651');
      const data = await response.json();
      setProjects(data.projects || []);
      setCategories(data.categories || {});
    } catch (error) {
      console.error('Ошибка загрузки галереи:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.features.some(f => f.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(filtered);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      landing: 'Globe',
      ecommerce: 'ShoppingCart',
      dashboard: 'BarChart3',
      business: 'Briefcase',
      chat: 'MessageSquare',
      crm: 'Users',
      productivity: 'CheckSquare',
      booking: 'Calendar',
      blog: 'FileText',
      fitness: 'Activity'
    };
    return icons[category] || 'Box';
  };

  const getComplexityColor = (complexity: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-green-500/20 text-green-300 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      hard: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    return colors[complexity] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const getComplexityLabel = (complexity: string) => {
    const labels: Record<string, string> = {
      easy: 'Простой',
      medium: 'Средний',
      hard: 'Сложный'
    };
    return labels[complexity] || complexity;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Icon name="Loader2" size={48} className="text-blue-400 animate-spin" />
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    landing: 'Лендинги',
    ecommerce: 'Магазины',
    dashboard: 'Дашборды',
    business: 'Бизнес',
    chat: 'Мессенджеры',
    crm: 'CRM',
    productivity: 'Продуктивность',
    booking: 'Бронирование',
    blog: 'Блоги',
    fitness: 'Фитнес'
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="Library" size={24} className="text-purple-400" />
                Галерея готовых проектов
              </CardTitle>
              <CardDescription className="text-slate-400">
                {filteredProjects.length} проектов • Примеры для вдохновения
              </CardDescription>
            </div>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Icon name="Sparkles" size={14} className="mr-1" />
              {Object.values(categories).reduce((a, b) => a + b, 0)} примеров
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Поиск по названию, описанию, функциям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            >
              <Icon name="X" size={16} className="mr-2" />
              Сбросить
            </Button>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="bg-slate-800/50 border border-purple-500/20 grid grid-cols-6 lg:grid-cols-11 gap-1 p-1">
              <TabsTrigger value="all" className="text-xs">
                Все ({projects.length})
              </TabsTrigger>
              {Object.entries(categories).map(([cat, count]) => (
                <TabsTrigger key={cat} value={cat} className="text-xs">
                  {categoryLabels[cat] || cat} ({count})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Проекты не найдены. Попробуйте изменить фильтры.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Card
                      key={project.gallery_id}
                      className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <div className="relative">
                        <div className="h-40 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                          <Icon
                            name={getCategoryIcon(project.category)}
                            size={48}
                            className="text-purple-400 opacity-50"
                          />
                        </div>
                        {project.is_featured && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            <Icon name="Star" size={12} className="mr-1" />
                            Популярное
                          </Badge>
                        )}
                        <Badge className={`absolute bottom-2 left-2 ${getComplexityColor(project.complexity)}`}>
                          {getComplexityLabel(project.complexity)}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                        <CardDescription className="text-slate-400 text-sm line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(project.tech_stack).slice(0, 3).map(([key, value]) => (
                            <Badge
                              key={key}
                              variant="outline"
                              className="bg-slate-900/50 text-slate-300 border-slate-700 text-xs"
                            >
                              {value}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-1">
                          {project.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                              <Icon name="CheckCircle2" size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                          <div className="flex gap-3 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                              <Icon name="Heart" size={14} />
                              <span>{project.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Eye" size={14} />
                              <span>{project.views}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => window.open(project.demo_url, '_blank')}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          >
                            <Icon name="ExternalLink" size={14} className="mr-1" />
                            Просмотр
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectGallery;
