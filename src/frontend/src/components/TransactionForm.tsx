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
  Clock,
  AlertTriangle,
} from 'lucide-react';

type ValidationGate = {
  name: string;
  status: 'pending' | 'pass' | 'fail';
  message?: string;
};

export function TransactionForm() {
  const [citizenId, setCitizenId] = useState('');
  const [scheme, setScheme] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationGates, setValidationGates] = useState<ValidationGate[]>([]);
  const [result, setResult] = useState<{ status: 'approved' | 'rejected'; message: string } | null>(
    null
  );

  const schemes = [
    { value: 'Pension', label: 'Pension Scheme - ₹2,000' },
    { value: 'Health', label: 'Health Scheme - ₹5,000' },
    { value: 'Education', label: 'Education Scheme - ₹3,000' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setResult(null);

    // Initialize gates
    const gates: ValidationGate[] = [
      { name: 'Eligibility Gate', status: 'pending' },
      { name: 'Budget Gate', status: 'pending' },
      { name: 'Frequency Gate', status: 'pending' },
    ];
    setValidationGates(gates);

    // Simulate validation process
    await new Promise((resolve) => setTimeout(resolve, 800));
    gates[0].status = 'pass';
    gates[0].message = 'Account active, Aadhaar linked, scheme eligible';
    setValidationGates([...gates]);

    await new Promise((resolve) => setTimeout(resolve, 600));
    gates[1].status = 'pass';
    gates[1].message = 'Sufficient budget available';
    setValidationGates([...gates]);

    await new Promise((resolve) => setTimeout(resolve, 600));
    gates[2].status = 'fail';
    gates[2].message = 'Last claim was 15 days ago (minimum 30 days required)';
    setValidationGates([...gates]);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setResult({
      status: 'rejected',
      message: 'Transaction rejected: Frequency gate violation. Please wait 15 more days.',
    });
    setIsProcessing(false);
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
          Process Benefit Claim
        </CardTitle>
        <CardDescription>
          Submit a claim for sequential validation through three security gates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="citizenId" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Citizen ID
              </Label>
              <Input
                id="citizenId"
                placeholder="Enter 12-digit Citizen ID"
                value={citizenId}
                onChange={(e) => setCitizenId(e.target.value)}
                maxLength={12}
                pattern="[0-9]{12}"
                required
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                12-digit numeric identifier (will be hashed with SHA-256)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheme" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Benefit Scheme
              </Label>
              <Select value={scheme} onValueChange={setScheme} required>
                <SelectTrigger id="scheme">
                  <SelectValue placeholder="Select a scheme" />
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
            disabled={isProcessing || !citizenId || !scheme}
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
