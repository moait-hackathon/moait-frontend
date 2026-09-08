<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    disabled?: boolean;
    errorMessage?: string;
  }>(),
  { disabled: false, errorMessage: '' }
);

defineEmits<{ primary: [] }>();
</script>

<template>
  <footer
    class="shrink-0 border-t border-dm-gray/10 bg-white px-5 pb-[max(18px,env(safe-area-inset-bottom))] pt-3 sm:px-8"
  >
    <p
      v-if="errorMessage"
      class="mb-2 text-xs font-semibold text-brand-dark"
      role="alert"
      aria-live="polite"
    >
      {{ errorMessage }}
    </p>
    <button
      type="button"
      class="grid h-[54px] w-full place-items-center rounded-xl bg-brand text-[15px] font-extrabold text-white transition enabled:hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-dm-gray/45"
      :disabled="disabled"
      @click="$emit('primary')"
    >
      {{ label }}
    </button>
  </footer>
</template>
