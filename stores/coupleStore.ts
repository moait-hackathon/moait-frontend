import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { toCouple } from '@/models/Couple';
import { getCouple } from '@/server/coupleApi';
import type { Couple } from '@/types/couple';

// 연결된 커플 정보. 커플 연결·마이페이지 등 여러 화면이 공유한다.
export const useCoupleStore = defineStore('couple', () => {
  const couple = ref<Couple | null>(null);
  const loaded = ref(false);

  const isConnected = computed(() => couple.value !== null);

  // GET /couples/me. 연결된 커플이 없으면 null 로 둔다(404 는 정상 흐름).
  async function loadCouple() {
    try {
      couple.value = toCouple(await getCouple());
    } catch {
      couple.value = null;
    } finally {
      loaded.value = true;
    }
  }

  function reset() {
    couple.value = null;
    loaded.value = false;
  }

  return { couple, loaded, isConnected, loadCouple, reset };
});
