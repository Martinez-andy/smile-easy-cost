
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon, MapPinIcon, PhoneIcon, MailIcon, CalendarIcon } from 'lucide-react';

// Mock dentist data
const mockDentist = {
  id: '1',
  name: 'Dr. Elena Morales',
  practice: 'Somerville Dental Clinic',
  address: '123 Main St, Somerville, MA 02143',
  phone: '(617) 555-1234',
  email: 'info@somervilledental.com',
  website: 'www.somervilledental.com',
  bio: 'Dr. Elena Morales has been practicing dentistry for over 15 years, specializing in restorative and cosmetic procedures. She graduated from Harvard School of Dental Medicine and is committed to providing affordable, high-quality care to all patients regardless of insurance status.',
  hours: [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
    { day: 'Saturday', hours: 'Closed' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  services: [
    {
      id: '1',
      name: 'Dental Implant',
      description: 'Complete dental implant procedure including abutment and crown.',
      price: 2800,
      discountPrice: 2600,
      duration: '2-3 visits',
    },
    {
      id: '2',
      name: 'Crown',
      description: 'Porcelain or ceramic crown, custom-made to match your natural teeth.',
      price: 950,
      discountPrice: 850,
      duration: '2 visits',
    },
    {
      id: '3',
      name: 'Bridge',
      description: 'Fixed dental bridge to replace one or more missing teeth.',
      price: 1800,
      discountPrice: 1700,
      duration: '2-3 visits',
    },
    {
      id: '4',
      name: 'Root Canal',
      description: 'Complete root canal treatment including filling.',
      price: 950,
      discountPrice: 850,
      duration: '1-2 visits',
    },
  ],
  financing: [
    {
      id: '1',
      name: 'In-House Payment Plan',
      description: 'Split your payment into 3 equal installments with no interest.',
      provider: 'Somerville Dental Clinic',
      terms: '0% interest, 3 monthly payments',
    },
    {
      id: '2',
      name: 'CareCredit',
      description: 'Healthcare credit card for dental procedures.',
      provider: 'CareCredit',
      terms: '0% interest if paid in full within 12 months',
    },
  ],
  reviews: [
    {
      id: '1',
      author: 'Sarah T.',
      rating: 5,
      date: '2023-09-15',
      comment: 'Dr. Morales and her team were fantastic! I saved over $800 on my dental implant compared to other quotes I received. The process was painless and the results are great.',
      procedure: 'Dental Implant',
    },
    {
      id: '2',
      author: 'Michael R.',
      rating: 4,
      date: '2023-08-22',
      comment: 'Great experience with my crown procedure. Dr. Morales was thorough in explaining the process and the costs upfront. The in-house payment plan was very helpful.',
      procedure: 'Crown',
    },
    {
      id: '3',
      author: 'Jennifer L.',
      rating: 5,
      date: '2023-07-10',
      comment: 'After putting off dental work for years due to cost concerns, I found Dr. Morales through a friend. Her prices were significantly better than other dentists in the area, and the quality was excellent.',
      procedure: 'Bridge',
    },
  ],
  image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
  mapUrl: 'https://maps.google.com/?q=123+Main+St,+Somerville,+MA+02143',
  rating: 4.8,
  reviewCount: 156,
};

const DentistProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('about');
  
  // In a real app, you would fetch the dentist data based on the ID
  const dentist = mockDentist;

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content area */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <img 
                src={dentist.image} 
                alt={dentist.name} 
                className="w-full h-auto rounded-lg object-cover aspect-square" 
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{dentist.name}</h1>
              <p className="text-xl text-muted-foreground">{dentist.practice}</p>
              
              <div className="flex items-center mt-2 mb-4">
                <div className="flex items-center text-yellow-500 mr-2">
                  <StarIcon className="w-5 h-5 mr-1" />
                  <span className="font-medium">{dentist.rating}</span>
                </div>
                <span className="text-muted-foreground">({dentist.reviewCount} reviews)</span>
              </div>
              
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  <span>{dentist.address}</span>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  <span>{dentist.phone}</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="w-5 h-5 mr-2" />
                  <span>{dentist.email}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  onClick={() => window.location.href = `/booking/${dentist.id}/consultation`}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  {t('dentistProfile.bookAppointment')}
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="about">{t('dentistProfile.about')}</TabsTrigger>
              <TabsTrigger value="services">{t('dentistProfile.services')}</TabsTrigger>
              <TabsTrigger value="reviews">{t('dentistProfile.reviews')}</TabsTrigger>
              <TabsTrigger value="financing">{t('dentistProfile.financingOptions')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6 mt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About Dr. {dentist.name.split(' ')[1]}</h2>
                <p>{dentist.bio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Office Hours</h3>
                <div className="grid grid-cols-2 gap-2">
                  {dentist.hours.map((item) => (
                    <div key={item.day} className="flex justify-between">
                      <span className="font-medium">{item.day}</span>
                      <span className="text-muted-foreground">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="services" className="space-y-6 mt-6">
              <h2 className="text-xl font-semibold">Services & Pricing</h2>
              <div className="space-y-4">
                {dentist.services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                          <p className="text-sm mt-2">Duration: {service.duration}</p>
                        </div>
                        <div className="text-right">
                          {service.discountPrice ? (
                            <>
                              <p className="text-sm line-through text-muted-foreground">
                                ${service.price}
                              </p>
                              <p className="text-2xl font-bold text-primary">
                                ${service.discountPrice}
                              </p>
                            </>
                          ) : (
                            <p className="text-2xl font-bold text-primary">
                              ${service.price}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={() => window.location.href = `/booking/${dentist.id}/${service.name}`}
                          variant="outline"
                        >
                          Book This Service
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Patient Reviews</h2>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-500 mr-2">
                    <StarIcon className="w-5 h-5 mr-1" />
                    <span className="font-medium">{dentist.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({dentist.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {dentist.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.author}</span>
                      <span className="mx-2">•</span>
                      <span className="text-muted-foreground text-sm">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Procedure: {review.procedure}
                    </p>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="financing" className="space-y-6 mt-6">
              <h2 className="text-xl font-semibold">Financing Options</h2>
              <p className="text-muted-foreground">
                {dentist.practice} offers the following financing options to help make your dental care more affordable.
              </p>
              
              <div className="space-y-4 mt-4">
                {dentist.financing.map((option) => (
                  <Card key={option.id}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold">{option.name}</h3>
                      <p className="text-muted-foreground">{option.description}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><span className="font-medium">Provider:</span> {option.provider}</p>
                        <p><span className="font-medium">Terms:</span> {option.terms}</p>
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={() => window.location.href = `/financing/${option.id}/apply`}
                          variant="outline"
                        >
                          Check Eligibility
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Book an Appointment</h3>
              <p className="text-muted-foreground mb-4">
                Select a service and preferred date to see available time slots.
              </p>
              <Button
                onClick={() => window.location.href = `/booking/${dentist.id}/consultation`}
                className="w-full"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {t('dentistProfile.bookAppointment')}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('dentistProfile.location')}</h3>
              <div className="aspect-video bg-muted rounded-md mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2947.5028411006294!2d-71.10346412346018!3d42.38696483417396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a8b670b201f%3A0xebbac8adf0b0d60c!2sSomerville%2C%20MA%2002143!5e0!3m2!1sen!2sus!4v1708208569577!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  <span>{dentist.address}</span>
                </div>
                <a 
                  href={dentist.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Get Directions
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  <span>{dentist.phone}</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="w-5 h-5 mr-2" />
                  <span>{dentist.email}</span>
                </div>
                <a 
                  href={`https://${dentist.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline block mt-2"
                >
                  {dentist.website}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DentistProfile;
