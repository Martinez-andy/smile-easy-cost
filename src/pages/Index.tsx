
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { SearchIcon, StarIcon, Clock3Icon, CreditCardIcon, ShieldIcon } from 'lucide-react';

// Mock procedures data
const procedures = [
  { id: 'implant', name: 'Dental Implant', icon: '🦷', avgPrice: '$2,600 - $3,300' },
  { id: 'crown', name: 'Crown', icon: '👑', avgPrice: '$850 - $1,050' },
  { id: 'bridge', name: 'Bridge', icon: '🌉', avgPrice: '$1,700 - $2,100' },
  { id: 'root-canal', name: 'Root Canal', icon: '🔬', avgPrice: '$800 - $1,200' },
  { id: 'dentures', name: 'Dentures', icon: '😁', avgPrice: '$1,500 - $3,000' },
  { id: 'extraction', name: 'Tooth Extraction', icon: '🔧', avgPrice: '$150 - $300' },
];

// Mock testimonials
const testimonials = [
  {
    quote: "I saved over $800 on my dental implant by comparing prices on CarePrice. The booking process was simple and transparent.",
    author: "Sarah T.",
    procedure: "Dental Implant",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "As someone without dental insurance, CarePrice has been a game-changer. I found an affordable dentist for my crown and even set up a payment plan.",
    author: "Michael R.",
    procedure: "Crown",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "The price transparency on CarePrice helped me choose a dentist within my budget. I no longer had to call multiple offices to compare prices.",
    author: "Jennifer L.",
    procedure: "Bridge",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [procedure, setProcedure] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?procedure=${procedure}&location=${location}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('homePage.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('homePage.hero.subtitle')}
            </p>
            
            <div className="bg-background rounded-lg shadow-lg p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('homePage.hero.searchLabel')}
                    </label>
                    <Select value={procedure} onValueChange={setProcedure}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a procedure" />
                      </SelectTrigger>
                      <SelectContent>
                        {procedures.map((proc) => (
                          <SelectItem key={proc.id} value={proc.name}>
                            {proc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('homePage.hero.locationLabel')}
                    </label>
                    <Input 
                      placeholder="Boston, MA or ZIP code" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full md:w-auto" size="lg">
                  <SearchIcon className="mr-2 h-4 w-4" />
                  {t('homePage.hero.buttonText')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('homePage.features.transparency.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('homePage.features.transparency.description')}
              </p>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('homePage.features.comparison.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('homePage.features.comparison.description')}
              </p>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock3Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('homePage.features.booking.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('homePage.features.booking.description')}
              </p>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCardIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('homePage.features.financing.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('homePage.features.financing.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Procedures Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              {t('homePage.procedures.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('homePage.procedures.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {procedures.map((procedure) => (
              <Card key={procedure.id} className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="text-4xl mb-4">{procedure.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{procedure.name}</h3>
                  <p className="text-primary font-medium">{procedure.avgPrice}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate(`/search?procedure=${procedure.name}`)}
                  >
                    Find Providers
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              {t('homePage.testimonials.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-primary/5 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.procedure}</p>
                  </div>
                </div>
                <p className="italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('homePage.cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('homePage.cta.subtitle')}
          </p>
          <Button size="lg" onClick={() => navigate('/search')}>
            {t('homePage.cta.buttonText')}
          </Button>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex items-center">
              <ShieldIcon className="h-6 w-6 text-primary mr-2" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <ShieldIcon className="h-6 w-6 text-primary mr-2" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center">
              <ShieldIcon className="h-6 w-6 text-primary mr-2" />
              <span>Verified Providers</span>
            </div>
            <div className="flex items-center">
              <ShieldIcon className="h-6 w-6 text-primary mr-2" />
              <span>Data Privacy</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
