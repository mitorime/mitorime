<template>
  <button @click="scrollToTop" v-if="!isMobile" v-show="showButton" class="scroll-to-top ui-icon-pushable">
    <img src="@/assets/ui/arrow-up.svg" class="ui-icon-large ui-icon-shadow" alt="back to top" />
  </button>
</template>

<script setup>
const isMobile = ref(false)
const showButton = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768
}
const handleScroll = () => {
  showButton.value = window.scrollY > 300
}
const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
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
  transition: 0.2s;
}
.scroll-to-top:hover {
  opacity: 1;
}
</style>