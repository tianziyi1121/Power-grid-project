export default {
  // 自定义指令节流函数
  throttle: {
    inserted (el, binding) {
      el.addEventListener('click', e => {
        if (binding.value) {
          el.disabled = true
          setTimeout(() => {
            el.disabled = false
          }, 2000)
        } else {
          el.disabled = false
        }
      })
    }
  }
}
