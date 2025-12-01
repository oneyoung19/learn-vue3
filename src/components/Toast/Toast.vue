<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}>()

const visible = ref(false)

// Expose close method to be called from outside
const close = () => {
  visible.value = false
}

onMounted(() => {
  visible.value = true
  if (props.duration !== 0) {
    setTimeout(() => {
      close()
    }, props.duration || 3000)
  }
})

defineExpose({
  close
})
</script>

<template>
  <Transition name="toast-fade" @after-leave="$emit('destroy')">
    <div v-show="visible" class="toast-container" :class="type || 'info'">
      <div class="toast-content">
        {{ message }}
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-container {
  padding: 10px 20px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  min-width: 200px;
  justify-content: center;
  margin-bottom: 15px;
  pointer-events: auto;
}

.toast-container.info {
  background-color: #909399;
}

.toast-container.success {
  background-color: #67c23a;
}

.toast-container.warning {
  background-color: #e6a23c;
}

.toast-container.error {
  background-color: #f56c6c;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
