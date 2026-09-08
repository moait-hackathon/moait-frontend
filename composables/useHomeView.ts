import { computed, onMounted } from 'vue';

import { useHomeStore } from '@/stores/homeStore';
import { formatAmount } from '@/utils/format';

export function useHomeView() {
  const homeStore = useHomeStore();
  const home = computed(() => homeStore.home);

  onMounted(() => {
    if (!homeStore.loaded) void homeStore.loadHome();
  });

  function formatDate(date: string): string {
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;
    return `${parsed.getFullYear()}.${String(parsed.getMonth() + 1).padStart(2, '0')}.${String(parsed.getDate()).padStart(2, '0')}`;
  }

  function formatRate(rate: number): string {
    return `${rate >= 0 ? '+' : ''}${rate.toFixed(2)}%`;
  }

  function formatChangeAmount(amount: number): string {
    return `${amount >= 0 ? '+' : ''}${formatAmount(amount)}원`;
  }

  return {
    home,
    formatAmount,
    formatDate,
    formatRate,
    formatChangeAmount,
  };
}
