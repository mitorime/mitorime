<template>
  <div>
    <MtrmHeader />
    <div class="search">
      <img src="@/assets/ui/tag.svg" class="ui-icon ui-icon-large" alt="sort" />
      <span class="search-query"> {{ queryTag }} </span>
    </div>
    <ContentList :query="{ path: '/post', sort: orders[order % 4], where: searchTag }">
      <template #default="{ list }">
        <div class="list">
          <button @click="changeOrder" class="list-button">
            <img :src="sortIcons[order % 4]" class="ui-icon-large" alt="sort" />
          </button>
          <nuxt-link :to="page._path" v-for="page in list" :key="page._path" class="list-child">
            <img :src="page.eyecatch" class="list-eyecatch" alt="eyecatch image" />
            <div class="list-detail">
              <div class="list-title">
                <span><div class="list-title-cap invert">{{ page.title }}</div></span>
                <span v-show="page.warning"><img src="@/assets/ui/warning.svg" class="ui-icon-medium" alt="content warning" /></span>
              </div>
              <div>
                <span class="list-descr"> {{ page.date }} </span>
                <span v-show="page.date != page.updated" class="list-descr"> - {{ page.updated }}</span>
              </div>
              <!--div class="list-descr"> {{ page.description }} </div-->
              <div class="list-categories"> {{ page.categories }}</div>
            </div>
          </nuxt-link>
        </div>
      </template>
      <template #not-found>
        <div class="list">
          <div class="search-notfound">
            not found!
          </div>
        </div>
      </template>
    </ContentList>
  </div>
  <div class="blank"></div>
  <MtrmFooter />
</template>

<script setup>
const route = useRoute()
const queryTag = route.query.q
const searchTag = { tags: { $contains: queryTag || 'no tags' }, hidden: false }
const sortIcons = ref([])
const order = ref(0)
const orders = ref([{updated: -1}, {updated: 1}, {title: 1}, {title: -1}])

const changeOrder = () => {
  return order.value++
}
useHead({
  title: '#' + `${route.query.q}` + ' | ミトリメ',
  meta: [
    { hid: 'og:title', property: 'og:title', content: '#' + `${route.query.q}` + ' | ミトリメ' },
  ]
})

onMounted(() => {
  sortIcons.value = [new URL('@/assets/ui/sort-0.svg', import.meta.url).href, new URL('@/assets/ui/sort-1.svg', import.meta.url).href, new URL('@/assets/ui/sort-2.svg', import.meta.url).href, new URL('@/assets/ui/sort-3.svg', import.meta.url).href]
})
</script>
