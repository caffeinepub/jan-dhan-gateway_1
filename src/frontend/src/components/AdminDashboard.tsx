import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  Pause,
  Play,
  AlertTriangle,
  CheckCircle2,
  Lock,
  TrendingDown,
  Activity,
  IndianRupee,
} from 'lucide-react';

export function AdminDashboard() {
  // Mock state - in real app, this would come from backend
  const [systemStatus, setSystemStatus] = useState<'Active' | 'Paused' | 'Frozen'>('Active');
  const [budgetRemaining] = useState(1000000);
  const [transactionCount] = useState(0);
  const [isPausing, setIsPausing] = useState(false);

  const initialBudget = 1000000;
  const budgetUsedPercent = ((initialBudget - budgetRemaining) / initialBudget) * 100;

  const handleEmergencyPause = async () => {
    setIsPausing(true);
    // Simulate API call
    setTimeout(() => {
      setSystemStatus(systemStatus === 'Active' ? 'Paused' : 'Active');
      setIsPausing(false);
    }, 500);
  };

  const getStatusColor = () => {
    switch (systemStatus) {
      case 'Active':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'Paused':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'Frozen':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
    }
  };

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'Active':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'Paused':
        return <Pause className="h-5 w-5" />;
      case 'Frozen':
        return <Lock className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* System Status Alert */}
      <Alert className={systemStatus !== 'Active' ? 'border-yellow-500/50 bg-yellow-500/5' : ''}>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          {systemStatus === 'Active' && 'System is operational. All validation gates are active.'}
          {systemStatus === 'Paused' && 'System is paused. New transactions are blocked.'}
          {systemStatus === 'Frozen' &&
            'System is frozen due to security violation. Contact administrator.'}
        </AlertDescription>
      </Alert>

      {/* Main Status Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                System Status Monitor
              </CardTitle>
              <CardDescription>Real-time system health and control panel</CardDescription>
            </div>
            <Badge className={`${getStatusColor()} text-base px-4 py-2 flex items-center gap-2`}>
              {getStatusIcon()}
              {systemStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Emergency Controls */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <h3 className="font-semibold text-foreground">Emergency Kill Switch</h3>
                <p className="text-sm text-muted-foreground">
                  Immediately halt all transaction processing
                </p>
              </div>
            </div>
            <Button
              variant={systemStatus === 'Active' ? 'destructive' : 'default'}
              size="lg"
              onClick={handleEmergencyPause}
              disabled={isPausing || systemStatus === 'Frozen'}
              className="min-w-[140px]"
            >
              {isPausing ? (
                'Processing...'
              ) : systemStatus === 'Active' ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause System
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Resume System
                </>
              )}
            </Button>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Budget Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-primary" />
                  Budget Remaining
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{budgetRemaining.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-muted-foreground">INR</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget Used</span>
                    <span className="font-medium">{budgetUsedPercent.toFixed(1)}%</span>
                  </div>
                  <Progress value={budgetUsedPercent} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingDown className="h-4 w-4" />
                  <span>Initial: ₹{initialBudget.toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Count Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Transaction Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{transactionCount}</span>
                  <span className="text-sm text-muted-foreground">processed</span>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Approved</span>
                    <span className="font-medium text-green-600 dark:text-green-400">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rejected</span>
                    <span className="font-medium text-red-600 dark:text-red-400">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Features */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Active Security Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>SHA-256 ID Hashing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Hash-Linked Ledger</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Replay Attack Prevention</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Tamper Detection</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>Three-Gate Validation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span>30-Day Frequency Lock</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
