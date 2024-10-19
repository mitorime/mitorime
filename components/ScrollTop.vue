<template>
  <button @click="scrollToTop" v-if="!isMobile" class="scroll-to-top">
    <img src="@/assets/ui/arrow-up.svg" class="ui-icon-large" alt="back to top" />
  </button>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const isMobile = ref(false)
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

</script>


<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 12px;
  right: 12px;
  border: none;
  background: none;
  cursor: pointer;
}

.scroll-to-top:hover {
  opacity: 1;
}
</style>