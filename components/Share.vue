<template>
  <button @click="shareContent" class="share">
    <img
      src="@/assets/ui/share.svg"
      class="ui-icon-medium ui-icon-pushable"
      :style="`${props.iconFilter}`"
      alt="share"
    />
  </button>
</template>

<script lang="ts" setup>
interface ShareData {
  title: string
  text: string
  url: string
}

const props = withDefaults(defineProps<{
  shareData: ShareData,
  iconFilter?: string
}>(), {
  shareData: () => ({
    title: 'ミトリメ',
    text: 'ミトリメ',
    url: typeof window !== 'undefined' ? window.location.href : ''
  }),
  iconFilter: ""
})

const shareContent = () => {
  if (navigator.share) {
    navigator.share(props.shareData)
      .then(() => console.log('Successfully shared'))
      .catch((error) => console.error('Error sharing', error))
  } else {
    alert('Web Share API をサポートしていないブラウザのようです。')
  }
}
</script>
