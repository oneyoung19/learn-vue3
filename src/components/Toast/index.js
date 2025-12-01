import { createVNode, render } from 'vue'
import ToastComponent from './Toast.vue'

let toastWrapper = null

const createWrapper = () => {
  const wrapper = document.createElement('div')
  // Set styles for the wrapper to position it and allow clicks to pass through
  wrapper.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  `
  document.body.appendChild(wrapper)
  return wrapper
}

/**
 * Toast function
 * @param {string|Object} options - Message string or options object
 * @param {string} options.message - The message text
 * @param {'success'|'warning'|'info'|'error'} [options.type='info'] - The type of toast
 * @param {number} [options.duration=3000] - Duration in milliseconds
 */
const Toast = (options) => {
  if (typeof options === 'string') {
    options = { message: options }
  }

  // Ensure wrapper exists
  if (!toastWrapper || !document.body.contains(toastWrapper)) {
    toastWrapper = createWrapper()
  }

  // Create a container for this specific toast instance
  const container = document.createElement('div')

  const destroy = () => {
    render(null, container)
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }

  const vnode = createVNode(ToastComponent, {
    ...options,
    onDestroy: destroy,
  })

  render(vnode, container)

  // Append the container to the wrapper
  toastWrapper.appendChild(container)

  return {
    close: () => {
      if (vnode.component && vnode.component.exposed && vnode.component.exposed.close) {
        vnode.component.exposed.close()
      }
    },
  }
}

;['success', 'warning', 'info', 'error'].forEach((type) => {
  Toast[type] = (message) => {
    return Toast({
      message,
      type,
    })
  }
})

export default Toast
