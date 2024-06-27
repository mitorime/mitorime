<template>
  <div>
    <div class="list">
      <div class="search">
        <img src="@/assets/ui/tag.svg" class="ui-icon-large" alt="sort" />
        <span class="search-query"> {{ queryTag }} </span>
      </div>
    </div>
    <ContentList :query="{ path: '/post', sort: orders[order % 4], where: searchTag }">
      <template #default="{ list }">
        <div class="list">
          <button @click="changeOrder"><img :src="sortIcons[order % 4]" class="ui-icon-large" alt="sort" /></button>
          <nuxt-link :to="page._path" v-for="page in list" :key="page._path" class="list-child">
            <img :src="page.eyecatch" class="list-eyecatch" alt="eyecatch image" />
            <div class="list-detail">
              <strong class="invert">{{ page.title }}</strong>
              <div> {{ page.date }} </div>
              <div class="list-descr"> {{ page.description }} </div>
            </div>
          </nuxt-link>
        </div>
      </template>
      <template #not-found>
        <div class="list">
          <div class="search-notfound">
            not found! ^_^
          </div>
        </div>
      </template>
    </ContentList>
  </div>
</template>

<script>
export default {
  setup() {
    const route = useRoute()
    const queryTag = route.query.q
    const searchTag = { tags: { $contains: queryTag || 'no tags' }, hidden: false }
    const sortIcons = ref([new URL('@/assets/ui/sort-0.svg', import.meta.url).href, new URL('@/assets/ui/sort-1.svg', import.meta.url).href, new URL('@/assets/ui/sort-2.svg', import.meta.url).href, new URL('@/assets/ui/sort-3.svg', import.meta.url).href, ])
    const order = ref(0)
    const orders = ref([{date: -1}, {date: 1}, {title: 1}, {title: -1}])
    const changeOrder = () => {
      return order.value++
    }
    useHead({
      title: '#' + `${route.query.q}` + ' | ミトリメ',
      meta: [
        { hid: 'og:title', property: 'og:title', content: '#' + `${route.query.q}` + ' | ミトリメ' },
      ]
    })
    return {
      queryTag, searchTag, order, orders, changeOrder
    }
  }
}
</script>
