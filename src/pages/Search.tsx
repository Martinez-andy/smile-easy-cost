
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Simulated data
const mockDentists = [
  {
    id: '1',
    name: 'Dr. Elena Morales',
    practice: 'Somerville Dental Clinic',
    address: '123 Main St, Somerville, MA 02143',
    distance: 1.2,
    rating: 4.8,
    reviewCount: 156,
    procedures: [
      { name: 'Dental Implant', price: 2800, discountPrice: 2600 },
      { name: 'Crown', price: 950, discountPrice: 850 },
      { name: 'Bridge', price: 1800, discountPrice: 1700 },
    ],
    financing: true,
    availability: '3 days',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    name: 'Dr. Michael Smith',
    practice: 'Cambridge Family Dentistry',
    address: '456 Broadway, Cambridge, MA 02139',
    distance: 2.5,
    rating: 4.6,
    reviewCount: 112,
    procedures: [
      { name: 'Dental Implant', price: 3100, discountPrice: 2950 },
      { name: 'Crown', price: 1000, discountPrice: 900 },
      { name: 'Bridge', price: 2000, discountPrice: 1850 },
    ],
    financing: true,
    availability: '1 week',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    name: 'Dr. Sarah Johnson',
    practice: 'Boston Smile Dentistry',
    address: '789 Tremont St, Boston, MA 02116',
    distance: 3.8,
    rating: 4.9,
    reviewCount: 205,
    procedures: [
      { name: 'Dental Implant', price: 3300, discountPrice: 3000 },
      { name: 'Crown', price: 1050, discountPrice: 950 },
      { name: 'Bridge', price: 2100, discountPrice: 1900 },
    ],
    financing: false,
    availability: '2 days',
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?auto=format&fit=crop&w=300&q=80',
  },
];

const SearchPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [distance, setDistance] = useState<number>(10);
  const [hasFinancing, setHasFinancing] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState('price_low');

  // Get search parameters
  const procedure = searchParams.get('procedure') || 'Dental Implant';
  const location = searchParams.get('location') || 'Boston, MA';

  // Filter and sort dentists based on filters
  const filteredDentists = mockDentists
    .filter(dentist => {
      const procedureObj = dentist.procedures.find(p => p.name === procedure);
      if (!procedureObj) return false;

      const price = procedureObj.discountPrice || procedureObj.price;
      
      return (
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        dentist.distance <= distance &&
        (!hasFinancing || dentist.financing)
      );
    })
    .sort((a, b) => {
      const procA = a.procedures.find(p => p.name === procedure);
      const procB = b.procedures.find(p => p.name === procedure);
      
      if (!procA || !procB) return 0;
      
      const priceA = procA.discountPrice || procA.price;
      const priceB = procB.discountPrice || procB.price;
      
      switch (sortBy) {
        case 'price_low':
          return priceA - priceB;
        case 'price_high':
          return priceB - priceA;
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        {t('search.title')}
      </h1>
      
      <div className="text-lg mb-8">
        {t('search.results.showing', { 
          count: filteredDentists.length, 
          procedure: procedure, 
          location: location 
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="space-y-6">
          <div className="bg-background rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">{t('search.filters.title')}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('search.filters.price')}
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={5000}
                  step={100}
                  onValueChange={value => setPriceRange(value as [number, number])}
                  className="my-4"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('search.filters.distance')}
                </label>
                <div className="flex items-center justify-between mb-2">
                  <span>0 miles</span>
                  <span>{distance} miles</span>
                </div>
                <Slider
                  defaultValue={[distance]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={value => setDistance(value[0])}
                  className="my-4"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="financing" 
                  checked={hasFinancing}
                  onCheckedChange={(checked) => 
                    setHasFinancing(checked as boolean)
                  }
                />
                <label
                  htmlFor="financing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('search.filters.financing')}
                </label>
              </div>
              
              <Button className="w-full">
                {t('search.filters.apply')}
              </Button>
              
              <Button variant="outline" className="w-full">
                {t('search.filters.clear')}
              </Button>
            </div>
          </div>
          
          <div className="bg-background rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">{t('search.sort.title')}</h2>
            <Select defaultValue={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_low">{t('search.sort.price_low')}</SelectItem>
                <SelectItem value="price_high">{t('search.sort.price_high')}</SelectItem>
                <SelectItem value="distance">{t('search.sort.distance')}</SelectItem>
                <SelectItem value="rating">{t('search.sort.rating')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results */}
        <div className="md:col-span-3 space-y-6">
          {filteredDentists.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">{t('search.results.noResults')}</h3>
            </div>
          ) : (
            filteredDentists.map((dentist) => {
              const procedureInfo = dentist.procedures.find(p => p.name === procedure);
              return (
                <Card key={dentist.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4 h-48 md:h-auto">
                        <img 
                          src={dentist.image} 
                          alt={dentist.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold">{dentist.name}</h3>
                            <p className="text-muted-foreground">{dentist.practice}</p>
                            <p className="text-sm">{dentist.address}</p>
                            <div className="flex items-center mt-1 text-sm">
                              <span className="mr-3">{dentist.distance} miles away</span>
                              <span className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4 text-yellow-500 mr-1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {dentist.rating} ({dentist.reviewCount})
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            {procedureInfo && (
                              <>
                                {procedureInfo.discountPrice ? (
                                  <>
                                    <p className="text-sm line-through text-muted-foreground">
                                      ${procedureInfo.price}
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                      ${procedureInfo.discountPrice}
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-2xl font-bold text-primary">
                                    ${procedureInfo.price}
                                  </p>
                                )}
                                <p className="text-sm">{procedure}</p>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                            Available in {dentist.availability}
                          </span>
                          {dentist.financing && (
                            <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">
                              Financing Available
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <a href={`/dentists/${dentist.id}`} className="text-primary font-medium hover:underline">
                            View Profile
                          </a>
                          <Button 
                            onClick={() => window.location.href = `/booking/${dentist.id}/${procedure}`}
                          >
                            {t('dentistProfile.bookAppointment')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
