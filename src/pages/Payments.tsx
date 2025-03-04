
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlusCircle, Filter, Download, Receipt, CreditCard, CalendarClock } from 'lucide-react';
import PaymentHistory from '@/components/payments/PaymentHistory';
import PaymentForm from '@/components/payments/PaymentForm';
import { useToast } from '@/components/ui/use-toast';

// Mock data for payment history
const paymentHistoryData = [
  {
    id: '1',
    studentName: 'Alex Johnson',
    studentId: 'S10023',
    amount: 500,
    description: 'Tuition Fee - Fall Semester',
    paymentMethod: 'Credit Card',
    status: 'completed',
    date: '2023-09-05T10:30:00',
  },
  {
    id: '2',
    studentName: 'Emma Wilson',
    studentId: 'S10024',
    amount: 250,
    description: 'Library Fee',
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    date: '2023-09-03T14:45:00',
  },
  {
    id: '3',
    studentName: 'Michael Brown',
    studentId: 'S10025',
    amount: 350,
    description: 'Lab Equipment Fee',
    paymentMethod: 'Credit Card',
    status: 'pending',
    date: '2023-09-07T09:15:00',
  },
  {
    id: '4',
    studentName: 'Sophia Martinez',
    studentId: 'S10026',
    amount: 500,
    description: 'Tuition Fee - Fall Semester',
    paymentMethod: 'Cash',
    status: 'completed',
    date: '2023-09-01T11:20:00',
  },
  {
    id: '5',
    studentName: 'William Taylor',
    studentId: 'S10027',
    amount: 150,
    description: 'Activity Fee',
    paymentMethod: 'Bank Transfer',
    status: 'failed',
    date: '2023-09-06T15:10:00',
  },
];

const Payments = () => {
  const [activeTab, setActiveTab] = useState('history');
  const { toast } = useToast();

  const handleCreatePayment = (data: any) => {
    // In a real app, this would send data to a backend
    console.log('Payment data submitted:', data);
    toast({
      title: "Payment Recorded",
      description: `${data.studentName} - $${data.amount} for ${data.description}`,
    });
    setActiveTab('history');
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Manage student payments and financial records
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={() => window.print()}
          >
            <Download size={16} />
            Export
          </Button>
          <Button 
            className="gap-1"
            onClick={() => setActiveTab('new')}
          >
            <PlusCircle size={16} />
            New Payment
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="history" className="gap-2">
            <Receipt size={16} />
            Payment History
          </TabsTrigger>
          <TabsTrigger value="new" className="gap-2">
            <CreditCard size={16} />
            Record Payment
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="gap-2">
            <CalendarClock size={16} />
            Upcoming Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-6">
              <PaymentHistory payments={paymentHistoryData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardContent className="p-6">
              <PaymentForm onSubmit={handleCreatePayment} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-muted p-3">
                  <CalendarClock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Upcoming Payments</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  There are no upcoming payments scheduled at this time. You can create payment schedules from the student profile.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
