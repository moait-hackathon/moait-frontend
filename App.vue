<script setup>
import { Toaster } from '@/components/ui/sonner';
</script>

<template>
  <RouterView />
  <Toaster
    position="top-center"
    rich-colors
  />
</template>
