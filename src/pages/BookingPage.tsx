
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
// Custom Steps component defined below
import { CheckIcon, ChevronRightIcon, ArrowLeftIcon } from 'lucide-react';

// Mock dentist data
const mockDentist = {
  id: '1',
  name: 'Dr. Elena Morales',
  practice: 'Somerville Dental Clinic',
  address: '123 Main St, Somerville, MA 02143',
  image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
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
  ],
  financing: [
    {
      id: '1',
      name: 'In-House Payment Plan',
      description: 'Split your payment into 3 equal installments with no interest.',
      provider: 'Somerville Dental Clinic',
      terms: '0% interest, 3 monthly payments',
      monthlyPayment: 866, // For a $2600 implant
    },
    {
      id: '2',
      name: 'CareCredit',
      description: 'Healthcare credit card for dental procedures.',
      provider: 'CareCredit',
      terms: '0% interest if paid in full within 12 months',
      monthlyPayment: 216, // For a $2600 implant over 12 months
    },
  ],
};

// Mock available time slots
const mockTimeSlots = {
  '2023-10-15': ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'],
  '2023-10-16': ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'],
  '2023-10-17': ['10:00 AM', '1:30 PM', '3:00 PM'],
  '2023-10-18': ['9:30 AM', '11:30 AM', '2:30 PM'],
  '2023-10-19': ['10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'],
};

// Mock component for Steps UI
const Steps = ({ currentStep, steps }: { currentStep: number; steps: string[] }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              index < currentStep
                ? 'bg-primary text-primary-foreground'
                : index === currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {index < currentStep ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-16 mx-2 ${
                index < currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

const BookingPage = () => {
  const { t } = useTranslation();
  const { dentistId, procedureId } = useParams<{ dentistId: string; procedureId: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    consent: false,
  });
  const [selectedFinancing, setSelectedFinancing] = useState<string | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // In a real app, you would fetch this data based on the IDs
  const dentist = mockDentist;
  const selectedService = dentist.services.find(s => s.name === procedureId) || dentist.services[0];
  
  const steps = [
    t('booking.steps.select_service'),
    t('booking.steps.select_time'),
    t('booking.steps.your_info'),
    t('booking.steps.financing'),
    t('booking.steps.confirm'),
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleFinish = () => {
    // In a real app, you would submit the booking data to your API
    setBookingComplete(true);
    window.scrollTo(0, 0);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const getAvailableTimeSlots = (date: Date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    // Simulate available time slots based on the selected date
    return mockTimeSlots[dateString] || [];
  };
  
  // Calculate total cost
  const totalCost = selectedService.discountPrice || selectedService.price;
  
  // Render different steps based on currentStep
  const renderStep = () => {
    if (bookingComplete) {
      return (
        <Card>
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">{t('booking.success.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('booking.success.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">{t('booking.confirmation.service')}</h3>
              <p>{selectedService.name}</p>
              
              <h3 className="font-medium mt-4 mb-2">{t('booking.confirmation.dentist')}</h3>
              <p>{dentist.name}</p>
              <p className="text-muted-foreground text-sm">{dentist.practice}</p>
              
              <h3 className="font-medium mt-4 mb-2">
                {t('booking.confirmation.date')} & {t('booking.confirmation.time')}
              </h3>
              <p>{selectedDate?.toLocaleDateString()} at {selectedTime}</p>
              
              <h3 className="font-medium mt-4 mb-2">{t('booking.confirmation.price')}</h3>
              <p className="text-lg font-bold">${totalCost}</p>
              {selectedFinancing && (
                <p className="text-sm text-muted-foreground">
                  Financing: {dentist.financing.find(f => f.id === selectedFinancing)?.name}
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">{t('booking.success.reference')}</h3>
              <p className="font-mono bg-muted p-2 rounded text-center">
                CARE-{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
              
              <h3 className="font-medium">{t('booking.success.instructions')}</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Please arrive 15 minutes before your appointment time</li>
                <li>Bring a valid photo ID and any dental records if available</li>
                <li>If you need to cancel, please do so at least 24 hours in advance</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" onClick={() => window.location.href = '/'}>
              {t('booking.success.homeButton')}
            </Button>
            <Button variant="outline" className="w-full">
              {t('booking.success.calendarButton')}
            </Button>
          </CardFooter>
        </Card>
      );
    }
    
    switch (currentStep) {
      case 0: // Select Service
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('booking.service.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src={dentist.image} 
                  alt={dentist.name} 
                  className="w-16 h-16 rounded-full object-cover" 
                />
                <div>
                  <h3 className="font-medium">{dentist.name}</h3>
                  <p className="text-sm text-muted-foreground">{dentist.practice}</p>
                  <p className="text-sm text-muted-foreground">{dentist.address}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">{t('booking.service.procedure')}</h3>
                <Select defaultValue={selectedService.id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {dentist.services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - ${service.discountPrice || service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{selectedService.name}</h3>
                  <div className="text-right">
                    {selectedService.discountPrice ? (
                      <>
                        <p className="text-sm line-through text-muted-foreground">
                          ${selectedService.price}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ${selectedService.discountPrice}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-primary">
                        ${selectedService.price}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{selectedService.description}</p>
                <p className="text-sm">
                  <span className="font-medium">{t('booking.service.duration')}:</span> {selectedService.duration}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext}>
                {t('booking.service.nextButton')}
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 1: // Select Date & Time
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('booking.datetime.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="font-medium mb-4">Select a Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => {
                      // Disable past dates and weekends in this example
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const day = date.getDay();
                      return date < today || day === 0 || day === 6;
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium mb-4">
                    {selectedDate ? `Available Times on ${selectedDate.toLocaleDateString()}` : 'Select a date first'}
                  </h3>
                  
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableTimeSlots(selectedDate).length > 0 ? (
                        getAvailableTimeSlots(selectedDate).map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className="justify-center"
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-muted-foreground col-span-2">
                          {t('booking.datetime.noTimes')}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                      <p className="text-muted-foreground">Please select a date</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                {t('booking.datetime.backButton')}
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!selectedDate || !selectedTime}
              >
                {t('booking.datetime.nextButton')}
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 2: // Your Information
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('booking.information.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('booking.information.firstName')}</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('booking.information.lastName')}</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('booking.information.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('booking.information.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">{t('booking.information.notes')}</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, consent: checked as boolean })
                  }
                  required
                />
                <label
                  htmlFor="consent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('booking.information.consent')}
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                {t('booking.information.backButton')}
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.consent}
              >
                {t('booking.information.nextButton')}
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        );
        
      case 3: // Financing Options
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('booking.financing.title')}</CardTitle>
              <CardDescription>
                {t('booking.financing.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={selectedFinancing || ''}
                onValueChange={setSelectedFinancing}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
                    <RadioGroupItem value="" id="pay-full" />
                    <Label htmlFor="pay-full" className="flex-1">
                      <div className="font-medium">{t('booking.financing.payFull')}</div>
                      <p className="text-sm text-muted-foreground">
                        Pay the full amount of ${totalCost} at your appointment
                      </p>
                    </Label>
                  </div>
                  
                  {dentist.financing.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 bg-muted p-4 rounded-lg">
                      <RadioGroupItem value={option.id} id={`financing-${option.id}`} />
                      <Label htmlFor={`financing-${option.id}`} className="flex-1">
                        <div className="font-medium">{option.name}</div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">{t('booking.financing.monthly')}:</span>{' '}
                            ${option.monthlyPayment}/month
                          </div>
                          <div>
                            <span className="font-medium">{t('booking.financing.termLength')}:</span>{' '}
                            {option.terms}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                {t('booking.financing.backButton')}
              </Button>
              <div className="space-x-2">
                <Button variant="ghost" onClick={handleNext}>
                  {t('booking.financing.skipButton')}
                </Button>
                <Button onClick={handleNext}>
                  {t('booking.financing.nextButton')}
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
        
      case 4: // Confirmation
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('booking.confirmation.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {t('booking.confirmation.service')}
                    </h3>
                    <p>{selectedService.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {t('booking.confirmation.price')}
                    </h3>
                    <p className="font-bold">${totalCost}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {t('booking.confirmation.dentist')}
                    </h3>
                    <p>{dentist.name}</p>
                    <p className="text-sm text-muted-foreground">{dentist.practice}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {t('booking.confirmation.location')}
                    </h3>
                    <p>{dentist.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {t('booking.confirmation.date')}
                    </h3>
                    <p>{selectedDate?.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      {t('booking.confirmation.time')}
                    </h3>
                    <p>{selectedTime}</p>
                  </div>
                </div>
                
                {selectedFinancing && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">
                      {t('booking.confirmation.financing')}
                    </h3>
                    <p>
                      {dentist.financing.find(f => f.id === selectedFinancing)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dentist.financing.find(f => f.id === selectedFinancing)?.terms}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">
                  {t('booking.confirmation.contactInfo')}
                </h3>
                <div className="bg-muted p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p>{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>{formData.phone}</p>
                  </div>
                  {formData.notes && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p>{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" defaultChecked />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  {t('booking.confirmation.terms')}
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                {t('booking.confirmation.backButton')}
              </Button>
              <Button onClick={handleFinish}>
                {t('booking.confirmation.confirmButton')}
              </Button>
            </CardFooter>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <Steps currentStep={currentStep} steps={steps} />
        {renderStep()}
      </div>
    </div>
  );
};

export default BookingPage;
