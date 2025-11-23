<template>
  <div>
    <ContentDoc v-slot="{ doc: page }">
      <MtrmHeader :logoFilter="page.logoColor" />
      <div ref="postbg" id="postbg" :style="page.bgColor"></div>
      <div id="post" class="post" :style="page.additionalStyle">
        <div class="post-header">
          <img :src="page.eyecatch" class="post-eyecatch" alt="eyecatch image" />
          <div class="post-title invert" :style="page.metaColor">{{ page.title }}</div>
          <span class="post-date invert" :style="page.metaColor">{{ page.date }}</span>
          <span v-show="page.date != page.updated" class="post-date invert" :style="page.metaColor"> - {{ page.updated }}</span>
          <div class="post-tags">
            <NuxtLink :to="`/category?q=${page.categories}`">
              <div class="pale-invert" :style="page.metaColor">mitorime > {{ page.categories }}</div>
            </NuxtLink>
          </div>
          <div class="post-writer" v-if="page.writtenby != 'mitori'">
            <img class="post-writer-icon" :src="page.writericon"/>
            <div class="post-written-by invert" :style="page.metaColor">{{ page.writtenby }}</div>
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
        <ContentRenderer :key="page._id" :value="page" id="text" class="post-text-wrap" />
        <Share :shareData="shareData" :iconFilter="page.logoColor"/>
        <div class="post-tags">
          <span v-for="tag in page.tags" :key="tag">
            <NuxtLink :to="`/tag?q=${tag}`">
              <div class="pale-invert" :style="page.metaColor">#{{ tag }}</div>
            </NuxtLink>
          </span>
        </div>
      </div>

      <MoreFromAuthor :author="page.writtenby" />
    </ContentDoc>
    <MtrmFooter />
    <ScrollTop />
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

const loadTwitterWidget = () => {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load()
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
  if (content.backgroundImage != undefined) {postbg.value.style.backgroundImage = `url(${content.backgroundImage})`} else {postbg.value.style.backgroundImage = "none"}
  if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.onload = loadTwitterWidget // 読み込み完了後に変換
    document.body.appendChild(script)
  } else {
    loadTwitterWidget()
  }
})
</script>

<style lang="scss" scoped>
#postbg {
  z-index: -3;
  position: fixed;
  margin-top: -54px;
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
  margin: 0 0;
}
.post-written-by {
  margin-left: -2px;
}
</style>