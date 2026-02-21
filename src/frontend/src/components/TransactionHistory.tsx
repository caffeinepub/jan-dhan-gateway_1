import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, CheckCircle2, XCircle, Clock } from 'lucide-react';

type Transaction = {
  id: string;
  timestamp: string;
  citizenId: string;
  scheme: string;
  amount: number;
  status: 'approved' | 'rejected';
  reason?: string;
};

export function TransactionHistory() {
  // Mock data - in real app, this would come from backend
  const transactions: Transaction[] = [
    {
      id: '1',
      timestamp: '2026-02-21 14:32:15',
      citizenId: '322651194174',
      scheme: 'Pension',
      amount: 2000,
      status: 'rejected',
      reason: 'Frequency gate violation',
    },
    {
      id: '2',
      timestamp: '2026-02-21 14:28:42',
      citizenId: '471464053117',
      scheme: 'Health',
      amount: 5000,
      status: 'approved',
    },
    {
      id: '3',
      timestamp: '2026-02-21 14:15:08',
      citizenId: '247760979123',
      scheme: 'Education',
      amount: 3000,
      status: 'rejected',
      reason: 'Claim count exceeded (4 > 3)',
    },
  ];

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Transaction History
        </CardTitle>
        <CardDescription>Recent benefit claim processing results</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">No transactions processed yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Submit a claim to see validation results here
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {tx.status === 'approved' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      )}
                      <Badge
                        variant={tx.status === 'approved' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {tx.status.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {tx.timestamp}
                    </span>
                  </div>

                  <div className="space-y-1 ml-7">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Citizen ID:</span>
                      <span className="text-sm font-mono text-muted-foreground">{tx.citizenId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Scheme:</span>
                      <span className="text-sm text-muted-foreground">{tx.scheme}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Amount:</span>
                      <span className="text-sm font-semibold">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {tx.reason && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Reason:</span> {tx.reason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
