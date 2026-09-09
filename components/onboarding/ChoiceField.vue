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
  <fieldset class="rounded-2xl border border-border bg-white p-4">
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
          class="flex min-h-[44px] items-center rounded-xl border border-border bg-white px-3.5 text-sm font-semibold text-muted-foreground transition peer-checked:border-primary peer-checked:bg-accent peer-checked:text-primary"
        >
          {{ option.label }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
