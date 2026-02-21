import { useState } from 'react';
import { Layout } from './components/Layout';
import { AdminDashboard } from './components/AdminDashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionHistory } from './components/TransactionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function App() {
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="transactions" className="text-base">
              Process Benefits
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-base">
              Admin Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <TransactionForm />
              <TransactionHistory />
            </div>
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default App;
