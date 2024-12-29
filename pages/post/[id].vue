<template>
  <div>
    <div ref="postbg" id="postbg"></div>
    <ContentDoc v-slot="{ doc: page }">
      <div class="post">
        <div class="post-header">
          <img :src="page.eyecatch" class="post-eyecatch" alt="eyecatch image" />
          <div class="post-title invert">{{ page.title }}</div>
          <span class="post-date invert">{{ page.date }}</span>
          <span v-show="page.date != page.updated" class="post-date invert"> - {{ page.updated }}</span>
          <div class="post-tags">
            <span v-for="tag in page.tags" :key="tag">
              <NuxtLink :to="`/tag?q=${tag}`">
                <div class="pale-invert">#{{ tag }}</div>
              </NuxtLink>
            </span>
          </div>
          <div class="post-writer">
            <img class="post-writer-icon" :src="page.writericon"/>
            <div class="post-written-by invert">{{ page.writtenby }}</div>
          </div>
          <div class="icon-text" v-show="page.warning">
            <span class="icon-text"><img src="@/assets/ui/warning.svg" class="ui-icon-medium" alt="content warning" /></span>
            <span class="text-grey">この記事は一部不快な表現を含みます。</span>
          </div>
          <div class="icon-text" v-show="page.hidden">
            <span class="icon-text"><img src="@/assets/ui/hidden.svg" class="ui-icon-medium" alt="this post will not be shown on the index." /></span>
            <span class="text-dark-grey">この記事は非表示に設定されています。</span>
          </div>
        </div>
        <ContentRenderer :key="page._id" :value="page" class="post-text-wrap"></ContentRenderer>
      </div>
    </ContentDoc>
    <button @click="shareContent" class="share">
      <img src="@/assets/ui/share.svg" class="ui-icon-medium" alt="share" />
    </button>
  </div>
</template>

<script setup>
const route = useRoute()
const content = await queryContent(route.fullPath).findOne()
const shareData = {
  title: `${content.title}`,
  text: `${content.title} - ミトリメ`,
  url: route.fullPath
}

const postbg = ref(null)

const shareContent = () => {
  if (navigator.share) {
    navigator.share(shareData)
    .then(() => console.log('Successfully shared'))
    .catch((error) => console.error('Error sharing', error))
  } else {
    alert('Web Share API is not supported in your browser.')
  }
}

useHead({
  title: `${content.title}` + ' | ミトリメ',
  meta: [
    { hid: 'description', name: 'description', content: `${content.title}` },
    { hid: 'og:title', property: 'og:title', content: `${content.title}` },
    { hid: 'og:description', name: 'og:description', content: `${content.title}` },
    { hid: 'og:type', property: 'og:type', content: 'article' },
    { hid: 'og:image', property: 'og:image', content: `${content.eyecatch}` }
  ]
})

onMounted(() => {
  if (content.backgroundColor != undefined) {
    postbg.value.style.backgroundColor = content.backgroundColor
  } else {
    postbg.value.style.backgroundColor = "none"
  }
  if (content.backgroundImage != undefined) {
    postbg.value.style.backgroundImage = `url(${content.backgroundImage})`
  } else {
    postbg.value.style.backgroundImage = "none"
  }
})
</script>

<style lang="scss" scoped>

#postbg {
  z-index: -3;
  position: fixed;
  margin-top: -48px;
  width: 100vw;
  height: 100%;
  background-image: none;
  background-color: none;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.post {
  max-width: 720px;
  margin: 0 auto;
  padding: 12px;
}
.post-header {
  padding: 16px 0 24px;
}
.post-eyecatch {
  width: 100%;
  height: auto;
  margin: 24px 0 36px;
}
.post-title {
  font-weight: bold;
  font-size: 24px;
  margin: 8px 0;
}
.post-tags {
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
  gap: 6px;
  margin: 8px 0;
}
.post-tags a {
  text-decoration: none;
}
.post-date {
  font-size: 20px;
  margin: 8px 0;
}
.post-text-wrap {
  margin: 32px auto;
}
.post-writer {
  display: flex;
  justify-content: flex-start;
  flex-flow: nowrap;
  align-items: center;
}
.post-writer-icon {
  width: 24px;
  height: auto;
}
.post-written-by {
  margin-left: -2px;
}
</style>