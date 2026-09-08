<script setup lang="ts">
type ChoiceValue = string | number | boolean;

defineProps<{
  label: string;
  options: readonly { value: ChoiceValue; label: string }[];
  modelValue: ChoiceValue | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: ChoiceValue];
}>();
</script>

<template>
  <fieldset class="rounded-2xl border border-dm-gray/30 bg-white p-4">
    <legend class="px-1 text-sm font-bold text-foreground">{{ label }}</legend>
    <div class="mt-2 flex flex-col gap-2">
      <label
        v-for="option in options"
        :key="String(option.value)"
        class="cursor-pointer"
      >
        <input
          class="peer sr-only"
          type="radio"
          :checked="modelValue === option.value"
          @change="emit('update:modelValue', option.value)"
        />
        <span
          class="flex min-h-[44px] items-center rounded-xl border border-dm-gray/40 bg-white px-3.5 text-sm font-semibold text-dm-gray-dark transition peer-checked:border-pink-03 peer-checked:bg-pink-01 peer-checked:text-brand-dark"
        >
          {{ option.label }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
