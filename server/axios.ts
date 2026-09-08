import axios, { type InternalAxiosRequestConfig } from 'axios';

import { ROUTE_NAMES } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

// 인증 헤더를 붙이지 않는 경로.
const PUBLIC_PATHS = new Set(['/auth/login', '/auth/signup']);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url && PUBLIC_PATHS.has(config.url)) return config;

  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 리프레시 토큰이 없으므로 401 이면 토큰을 폐기하고 로그인 화면으로 보낸다.
let redirecting = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && !redirecting) {
      redirecting = true;
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);

      const { default: router } = await import('@/router');
      if (router.currentRoute.value.name !== ROUTE_NAMES.LOGIN) {
        await router.replace({ name: ROUTE_NAMES.LOGIN });
      }
      redirecting = false;
    }
    return Promise.reject(error);
  }
);
