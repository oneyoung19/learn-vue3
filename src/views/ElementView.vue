<template>
  <div class="element-view">
    <el-input v-model="input" placeholder="Please input" />
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="showToast">Show Toast</el-button>
      <el-button type="success" @click="showSuccess">Success</el-button>
      <el-button type="warning" @click="showWarning">Warning</el-button>
      <el-button type="danger" @click="showError">Error</el-button>
    </div>
    <!-- use counter -->
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="increment">Increment</el-button>
      <el-button type="primary" @click="decrement">Decrement</el-button>
      <el-button type="primary" @click="reset">Reset</el-button>
    </div>
    <div style="margin-top: 20px;">
      <span>Count: {{ count }}</span>
    </div>
    <!-- @vueuse/core -->
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="handleChangeStorageCount">Change Store Count</el-button>
      <p>X: {{ x }}</p>
      <p>Y: {{ y }}</p>
      <p>Is Dark: {{ isDark }}</p>
      <p>Name: {{ Storage.name }}</p>
      <p>Color: {{ Storage.color }}</p>
      <p>Count: {{ Storage.count }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Toast from '../components/Toast'
import { useLocalStorage, useMouse, usePreferredDark } from '@vueuse/core'

const showToast = () => {
  Toast('Hello World')
}

const showSuccess = () => {
  Toast.success('Success Message')
}

const showWarning = () => {
  Toast.warning('Warning Message')
}

const showError = () => {
  Toast.error('Error Message')
}

const input = ref('')
const obj = ref({
  name: 'John'
})

const useName = (obj) => {
  console.log(obj)
  return obj.value.name + ' Doe'
}
const newName = useName(obj)
obj.value.name = 'Jane'

// console.log(input)
// console.log(obj)

function useCounter(initial = 0) {
  const count = ref(initial)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initial

  return {
    count,
    increment,
    decrement,
    reset,
  }
}

const { count, increment, decrement, reset } = useCounter()


// tracks mouse position
const { x, y } = useMouse()

// is user prefers dark theme
const isDark = usePreferredDark()

// persist state in localStorage
const Storage = useLocalStorage(
  'my-storage',
  {
    name: 'Apple',
    color: 'red',
    count: 0,
  },
)

console.log(Storage)

function handleChangeStorageCount() {
  Storage.value.count++
}

</script>

<style scoped lang="less"></style>
