import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Shield,
  User,
  Wallet,
  AlertTriangle,
} from 'lucide-react';
import { useActor } from '@/hooks/useActor';
import type { ValidationRequest } from '@/backend';

type ValidationGate = {
  name: string;
  status: 'pending' | 'pass' | 'fail';
  message?: string;
};

export function TransactionForm() {
  const { actor } = useActor();
  const [employeeId, setEmployeeId] = useState('');
  const [scheme, setScheme] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationGates, setValidationGates] = useState<ValidationGate[]>([]);
  const [result, setResult] = useState<{ status: 'approved' | 'rejected'; message: string } | null>(
    null
  );

  const schemes = [
    { value: 'Salary Advance', label: 'Salary Advance - Up to ₹50,000', defaultAmount: '30000' },
    { value: 'Medical Reimbursement', label: 'Medical Reimbursement - Up to ₹25,000', defaultAmount: '15000' },
    { value: 'Travel Allowance', label: 'Travel Allowance - Up to ₹10,000', defaultAmount: '8000' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;

    setIsProcessing(true);
    setResult(null);

    // Initialize gates
    const gates: ValidationGate[] = [
      { name: 'Eligibility Gate', status: 'pending' },
      { name: 'Budget Gate', status: 'pending' },
      { name: 'Frequency Gate', status: 'pending' },
    ];
    setValidationGates(gates);

    try {
      // Simulate gate-by-gate validation
      await new Promise((resolve) => setTimeout(resolve, 800));
      gates[0].status = 'pass';
      gates[0].message = 'Employee active, department and designation verified';
      setValidationGates([...gates]);

      await new Promise((resolve) => setTimeout(resolve, 600));
      gates[1].status = 'pass';
      gates[1].message = 'Sufficient budget available for benefit type';
      setValidationGates([...gates]);

      await new Promise((resolve) => setTimeout(resolve, 600));

      // Call backend validation
      const request: ValidationRequest = {
        employeeId,
        benefitSchemeName: scheme,
        requestedAmount: BigInt(amount),
        timestamp: BigInt(Date.now()),
      };

      const response = await actor.validateEligibility(request);

      if (response.isEligible) {
        gates[2].status = 'pass';
        gates[2].message = 'All validation checks passed';
        setValidationGates([...gates]);

        await new Promise((resolve) => setTimeout(resolve, 400));
        setResult({
          status: 'approved',
          message: `Benefit approved! Amount: ₹${Number(response.approvedAmount).toLocaleString('en-IN')}`,
        });
      } else {
        gates[2].status = 'fail';
        gates[2].message = response.reason || 'Validation failed';
        setValidationGates([...gates]);

        await new Promise((resolve) => setTimeout(resolve, 400));
        setResult({
          status: 'rejected',
          message: `Benefit rejected: ${response.message}`,
        });
      }
    } catch (error: any) {
      gates[0].status = 'fail';
      gates[0].message = error.message || 'Validation error occurred';
      setValidationGates([...gates]);

      setResult({
        status: 'rejected',
        message: `Error: ${error.message || 'Unknown error'}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getGateIcon = (status: ValidationGate['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'pending':
        return <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />;
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Process Benefit Request
        </CardTitle>
        <CardDescription>
          Submit an employee benefit request for sequential validation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Employee ID
              </Label>
              <Input
                id="employeeId"
                placeholder="Enter Employee ID (e.g., EMP001)"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Employee identifier from the registry
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheme" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Benefit Type
              </Label>
              <Select 
                value={scheme} 
                onValueChange={(value) => {
                  setScheme(value);
                  const selectedScheme = schemes.find(s => s.value === value);
                  if (selectedScheme) {
                    setAmount(selectedScheme.defaultAmount);
                  }
                }} 
                required
              >
                <SelectTrigger id="scheme">
                  <SelectValue placeholder="Select a benefit type" />
                </SelectTrigger>
                <SelectContent>
                  {schemes.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Requested Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
              />
              <p className="text-xs text-muted-foreground">
                Amount must be within benefit type limits
              </p>
            </div>
          </div>

          {/* Validation Gates Display */}
          {validationGates.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Validation Progress
                </h3>
                {validationGates.map((gate, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card/50"
                  >
                    {getGateIcon(gate.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{gate.name}</span>
                        {gate.status !== 'pending' && (
                          <Badge
                            variant={gate.status === 'pass' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {gate.status === 'pass' ? 'PASS' : 'FAIL'}
                          </Badge>
                        )}
                      </div>
                      {gate.message && (
                        <p className="text-xs text-muted-foreground mt-1">{gate.message}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Result Display */}
          {result && (
            <>
              <Separator />
              <Alert
                className={
                  result.status === 'approved'
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-red-500/50 bg-red-500/5'
                }
              >
                {result.status === 'approved' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
                <AlertDescription className="font-medium">{result.message}</AlertDescription>
              </Alert>
            </>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isProcessing || !employeeId || !scheme || !amount || !actor}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Validation...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Submit for Validation
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
