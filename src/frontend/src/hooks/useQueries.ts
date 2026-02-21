import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Placeholder hooks for when backend is implemented
export function useSystemStatus() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['systemStatus'],
    queryFn: async () => {
      if (!actor) return null;
      // Backend method not yet implemented
      return {
        status: 'Active' as 'Active' | 'Paused' | 'Frozen',
        budgetRemaining: 1000000,
        transactionCount: 0,
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000, // Poll every 5 seconds
  });
}

export function useTransactionHistory() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['transactionHistory'],
    queryFn: async () => {
      if (!actor) return [];
      // Backend method not yet implemented
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}
