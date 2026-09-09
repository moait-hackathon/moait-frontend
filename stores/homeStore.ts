import { defineStore } from 'pinia';
import { ref } from 'vue';

import { toHome } from '@/models/Home';
import { getHome } from '@/server/homeApi';
import type { Home } from '@/types/home';

// 홈 화면 조회 데이터.
export const useHomeStore = defineStore('home', () => {
  const home = ref<Home | null>(null);
  const loaded = ref(false);

  async function loadHome() {
    try {
      home.value = toHome(await getHome());
    } finally {
      loaded.value = true;
    }
  }

  function reset() {
    home.value = null;
    loaded.value = false;
  }

  return { home, loaded, loadHome, reset };
});
