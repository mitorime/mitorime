<template>
  <div>
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
                <div class="pale-invert text-nodec">#{{ tag }}</div>
              </NuxtLink>
            </span>
          </div>
          <div class="icon-text" v-show="page.warning">
            <span class="icon-text"><img src="@/assets/ui/warning.svg" class="ui-icon-medium" alt="content warning" /></span>
            <span class="text-grey">この記事は一部不快な表現を含みます。</span>
          </div>
          <div class="icon-text" v-show="page.hidden">
            <span class="icon-text"><img src="@/assets/ui/hidden.svg" class="ui-icon-medium" alt="this post will not be shown on the index." /></span>
            <span class="text-dark-grey">この記事は一覧には表示されません。</span>
          </div>
        </div>
        <ContentRenderer :key="page._id" :value="page" class="post-text-wrap"></ContentRenderer>
      </div>
    </ContentDoc>
  </div>
</template>

<script setup>
const route = useRoute()
const content = await queryContent(route.fullPath).findOne()

useHead({
  title: `${content.title}` + ' | ミトリメ',
  meta: [
    { hid: 'description', name: 'description', content: `${content.title}` },
    { hid: 'og:title', property: 'og:title', content: `${content.title}` + ' | ミトリメ' },
    { hid: 'og:description', name: 'og:description', content: `${content.title}` },
    { hid: 'og:type', property: 'og:type', content: 'article' },
    { hid: 'og:image', property: 'og:image', content: `${content.eyecatch}` }
  ]
})
</script>

<style lang="scss" scoped>
.post {
  background-color: $basic-light;
  max-width: 720px;
  margin: 0 auto 36px;
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
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0;
}
.post-date {
  font-size: 20px;
  margin: 8px 0;
}
.post-text-wrap {
  margin: 32px auto;
}
</style>