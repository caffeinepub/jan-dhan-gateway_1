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
  XCircle,
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
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'Paused':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'Frozen':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
    }
  };

  const securityFeatures = [
    { name: 'Sequential Validation', active: true },
    { name: 'Employee Status Check', active: true },
    { name: 'Department Verification', active: true },
    { name: 'Salary Range Validation', active: true },
    { name: 'Budget Monitoring', active: true },
  ];

  return (
    <div className="space-y-6">
      {/* System Status Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            System Status & Controls
          </CardTitle>
          <CardDescription>
            Monitor and control the employee benefits processing system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Current Status</p>
                <p className="text-xs text-muted-foreground">System operational state</p>
              </div>
            </div>
            <Badge className={`${getStatusColor()} text-sm px-3 py-1`}>
              {systemStatus === 'Active' && <CheckCircle2 className="h-3 w-3 mr-1" />}
              {systemStatus === 'Paused' && <Pause className="h-3 w-3 mr-1" />}
              {systemStatus === 'Frozen' && <Lock className="h-3 w-3 mr-1" />}
              {systemStatus}
            </Badge>
          </div>

          {/* Emergency Pause Button */}
          <div className="space-y-3">
            <Alert className="border-yellow-500/50 bg-yellow-500/5">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              <AlertDescription className="text-sm">
                Emergency pause will immediately halt all benefit processing. Use only in case of
                security concerns or system issues.
              </AlertDescription>
            </Alert>
            <Button
              onClick={handleEmergencyPause}
              variant={systemStatus === 'Active' ? 'destructive' : 'default'}
              className="w-full"
              size="lg"
              disabled={isPausing}
            >
              {isPausing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : systemStatus === 'Active' ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Emergency Pause System
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Resume System
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Budget Monitor */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <IndianRupee className="h-5 w-5 text-primary" />
              Budget Monitor
            </CardTitle>
            <CardDescription>Track benefit budget utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Remaining Budget</span>
                <span className="font-bold text-lg">
                  ₹{budgetRemaining.toLocaleString('en-IN')}
                </span>
              </div>
              <Progress value={100 - budgetUsedPercent} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Used: {budgetUsedPercent.toFixed(1)}%</span>
                <span>Total: ₹{initialBudget.toLocaleString('en-IN')}</span>
              </div>
            </div>
            {budgetUsedPercent > 80 && (
              <Alert className="border-yellow-500/50 bg-yellow-500/5">
                <TrendingDown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertDescription className="text-xs">
                  Budget utilization is high. Consider reviewing benefit allocations.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Transaction Counter */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Transaction Count
            </CardTitle>
            <CardDescription>Total benefits processed today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-primary">{transactionCount}</p>
                <p className="text-sm text-muted-foreground mt-2">Benefits Processed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Features */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Active Security Features
          </CardTitle>
          <CardDescription>
            Multi-layer validation protecting employee benefit processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card/50"
              >
                {feature.active ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{feature.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
