import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { AI_REPORT_ROUTE_NAME } from '@/constants/aiReport';
import { ROUTE_NAMES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { useHomeStore } from '@/stores/homeStore';
import { formatAmount, formatKrwUnit } from '@/utils/format';

// 자산 배분 도넛/범례 슬라이스 색. (index 순서대로 매칭)
const ALLOCATION_SLICE_COLORS = ['#219E8B', '#047797', '#B7FFE7', '#97F9D8'];

// 인사말 밑 그래프 좌표계.
const GRAPH_WIDTH = 170;
const GRAPH_HEIGHT = 70;
const GRAPH_PADDING = 5;

export function useHomeView() {
  const router = useRouter();
  const authStore = useAuthStore();
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

  function goToAiReport() {
    void router.push({ name: AI_REPORT_ROUTE_NAME });
  }

  function goToAiChat() {
    void router.push({ name: 'ai' });
  }

  // TODO: 마이페이지 화면 연결 전까지 임시로 로그아웃 동작.
  function goToMyPage() {
    authStore.logout();
    homeStore.reset();
    void router.replace({ name: ROUTE_NAMES.LOGIN });
  }

  // 달성률 도넛 progress. 0~1 정규화 (SVG stroke-dashoffset 용).
  const achievementFraction = computed(() =>
    Math.min(Math.max((home.value?.achievementRate ?? 0) / 100, 0), 1)
  );

  const graphCoords = computed(() => {
    const graph = home.value?.assetReturnRateGraph ?? [];
    if (graph.length === 0) return [] as { x: number; y: number }[];

    const rates = [0, ...graph.map((item) => item.returnRate)];
    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const range = max - min || 1;

    return graph.map((item, index) => {
      const x =
        GRAPH_PADDING + (index / Math.max(graph.length - 1, 1)) * (GRAPH_WIDTH - GRAPH_PADDING * 2);
      const y =
        GRAPH_HEIGHT -
        GRAPH_PADDING -
        ((item.returnRate - min) / range) * (GRAPH_HEIGHT - GRAPH_PADDING * 2);
      return { x, y };
    });
  });

  const graphPoints = computed(() =>
    graphCoords.value.map((point) => `${point.x},${point.y}`).join(' ')
  );

  // 폴리라인 아래를 채우는 영역용 좌표(양 끝을 바닥까지 내린다).
  const graphAreaPoints = computed(() => {
    const coords = graphCoords.value;
    if (coords.length === 0) return '';
    const first = coords[0];
    const last = coords[coords.length - 1];
    return `${first.x},${GRAPH_HEIGHT} ${graphPoints.value} ${last.x},${GRAPH_HEIGHT}`;
  });

  // 자산 배분 도넛 세그먼트. fraction/start 는 0~1 정규화 (SVG stroke-dasharray 용).
  const allocationSegments = computed(() => {
    let acc = 0;
    return (home.value?.assetAllocation.slices ?? []).map((slice, index) => {
      const start = acc / 100;
      acc += slice.ratio;
      return {
        key: slice.key,
        label: slice.label,
        ratio: slice.ratio,
        color: ALLOCATION_SLICE_COLORS[index % ALLOCATION_SLICE_COLORS.length],
        fraction: slice.ratio / 100,
        start,
      };
    });
  });

  return {
    home,
    formatAmount,
    formatKrwUnit,
    formatDate,
    formatRate,
    formatChangeAmount,
    goToAiReport,
    goToAiChat,
    goToMyPage,
    achievementFraction,
    graphPoints,
    graphAreaPoints,
    allocationSegments,
  };
}
