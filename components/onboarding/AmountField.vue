<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div>
    <label
      class="mb-1.5 block text-sm font-bold text-foreground"
      :for="id"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        class="h-[46px] w-full rounded-xl border border-dm-gray/40 bg-white pl-3.5 pr-9 text-right text-sm font-semibold text-foreground outline-none transition placeholder:font-medium placeholder:text-dm-gray focus:border-pink-03 focus:ring-3 focus:ring-brand/10"
        type="text"
        inputmode="numeric"
        :value="modelValue"
        :placeholder="placeholder ?? '0'"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span
        class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-dm-gray-dark"
      >
        원
      </span>
    </div>
  </div>
</template>
