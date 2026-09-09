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

  const achievementDegree = computed(() => `${(home.value?.achievementRate ?? 0) * 3.6}deg`);

  const graphPoints = computed(() => {
    const graph = home.value?.assetReturnRateGraph ?? [];
    if (graph.length === 0) return '';

    const width = 170;
    const height = 70;
    const padding = 5;
    const rates = [0, ...graph.map((item) => item.returnRate)];
    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const range = max - min || 1;

    return graph
      .map((item, index) => {
        const x = padding + (index / Math.max(graph.length - 1, 1)) * (width - padding * 2);
        const y = height - padding - ((item.returnRate - min) / range) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(' ');
  });

  return {
    home,
    formatAmount,
    formatDate,
    formatRate,
    formatChangeAmount,
    achievementDegree,
    graphPoints,
  };
}
