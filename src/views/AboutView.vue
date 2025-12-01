<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      Storage Count: {{ storage.count }}
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core'

const storage = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
    count: 0,
  },
)
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    /* display: flex; */
    align-items: center;
    /* flex-direction: column; */
  }
}
</style>
