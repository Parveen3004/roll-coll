
import React, { useState } from 'react';
import { PaymentForm } from '@/components/payments/PaymentForm';
import { PaymentHistory } from '@/components/payments/PaymentHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ResultsFilter } from '@/components/ui/results-filter';

// Define Payment type with correct status type
interface Payment {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  description: string;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

const Payments = () => {
  const [view, setView] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  
  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Payments' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
  ];

  // Handle filter change
  const handleFilterChange = (option: string) => {
    setFilterOption(option);
  };

  // Example payments data with correct status types
  const payments: Payment[] = [
    {
      id: 'PAY-001',
      studentName: 'John Doe',
      studentId: 'STU-123',
      amount: 500,
      description: 'Tuition Fee - Fall Semester',
      paymentMethod: 'Credit Card',
      status: 'completed',
      date: '2023-11-10T08:30:00'
    },
    {
      id: 'PAY-002',
      studentName: 'Jane Smith',
      studentId: 'STU-456',
      amount: 150,
      description: 'Lab Equipment Fee',
      paymentMethod: 'Bank Transfer',
      status: 'pending',
      date: '2023-11-12T14:45:00'
    },
    {
      id: 'PAY-003',
      studentName: 'Michael Johnson',
      studentId: 'STU-789',
      amount: 200,
      description: 'Library Fee',
      paymentMethod: 'PayPal',
      status: 'completed',
      date: '2023-11-08T11:20:00'
    },
    {
      id: 'PAY-004',
      studentName: 'Sarah Williams',
      studentId: 'STU-101',
      amount: 350,
      description: 'Exam Registration Fee',
      paymentMethod: 'Credit Card',
      status: 'failed',
      date: '2023-11-05T09:15:00'
    },
    {
      id: 'PAY-005',
      studentName: 'David Brown',
      studentId: 'STU-202',
      amount: 180,
      description: 'Sports Activities Fee',
      paymentMethod: 'Cash',
      status: 'completed',
      date: '2023-11-14T16:50:00'
    }
  ];

  // Filter payments based on search query, view, and filter option
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (view === 'completed' && payment.status !== 'completed') return false;
    if (view === 'pending' && payment.status !== 'pending') return false;
    if (view === 'failed' && payment.status !== 'failed') return false;
    
    if (filterOption === 'completed' && payment.status !== 'completed') return false;
    if (filterOption === 'pending' && payment.status !== 'pending') return false;
    if (filterOption === 'failed' && payment.status !== 'failed') return false;
    
    return true;
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Payments</h1>
        <p className="text-muted-foreground">Manage student payments and transactions</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Button onClick={toggleForm} className="sm:ml-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                {showForm ? "Hide Form" : "Record Payment"}
              </Button>
            </div>
            <ResultsFilter
              options={filterOptions}
              value={filterOption}
              onChange={handleFilterChange}
            />
          </div>

          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Record New Payment</CardTitle>
                <CardDescription>Enter the details for the new payment</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentForm onSuccess={() => setShowForm(false)} />
              </CardContent>
            </Card>
          )}

          <Tabs value={view} onValueChange={setView}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <PaymentHistory payments={filteredPayments} />
            </TabsContent>
            
            <TabsContent value="completed">
              <PaymentHistory payments={filteredPayments.filter(p => p.status === 'completed')} />
            </TabsContent>
            
            <TabsContent value="pending">
              <PaymentHistory payments={filteredPayments.filter(p => p.status === 'pending')} />
            </TabsContent>
            
            <TabsContent value="failed">
              <PaymentHistory payments={filteredPayments.filter(p => p.status === 'failed')} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
              <CardDescription>Overview of payment statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Total Payments</div>
                  <div className="text-2xl font-bold">5</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Total Amount</div>
                  <div className="text-2xl font-bold">$1,380</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Payment Status</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-green-100 dark:bg-green-900/20 p-2">
                    <Badge variant="success">Completed</Badge>
                    <p className="mt-1 text-lg font-semibold">3</p>
                  </div>
                  <div className="rounded-md bg-amber-100 dark:bg-amber-900/20 p-2">
                    <Badge variant="warning">Pending</Badge>
                    <p className="mt-1 text-lg font-semibold">1</p>
                  </div>
                  <div className="rounded-md bg-red-100 dark:bg-red-900/20 p-2">
                    <Badge variant="destructive">Failed</Badge>
                    <p className="mt-1 text-lg font-semibold">1</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Payment Methods</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credit Card</span>
                    <span className="font-medium">$850 (2)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Transfer</span>
                    <span className="font-medium">$150 (1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PayPal</span>
                    <span className="font-medium">$200 (1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cash</span>
                    <span className="font-medium">$180 (1)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payments;
