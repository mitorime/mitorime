<template>
  <div>
    <ContentList
      v-slot="{ list }"
      :query="{
        path: '/post',
        sort: { updated: -1 },
        where: { writtenby: props.author },
        limit: 3
      }"
    >
      <div class="list">
        <div class="list-header">
          <img
            src="/icon.png"
            class="list-icon"
            alt="mitorime logo"
          />
          {{ props.author }}が書いた記事
        </div>
        <NuxtLink
          :to="page._path"
          v-for="page in list"
          :key="page._path"
          class="list-child"
        >
          <img :src="page.eyecatch" class="list-eyecatch" alt="eyecatch image" />
          <div class="list-detail">
            <div class="list-title">
              <span>
                <div class="list-title-cap invert">{{ page.title }}</div>
              </span>
              <span v-show="page.warning">
                <img src="@/assets/ui/warning.svg" class="ui-icon-medium" alt="content warning" />
              </span>
            </div>
            <div>
              <span class="list-descr"> {{ page.date }} </span>
              <span v-show="page.date != page.updated" class="list-descr"> - {{ page.updated }}</span>
            </div>
            <!--div class="list-descr"> {{ page.description }} </div-->
            <div class="list-categories"> {{ page.categories }}</div>
          </div>
        </NuxtLink>
      </div>
    </ContentList>
    <div class="blank"></div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  author?: string
}>(), {
  author: 'mitori'
})
</script>

<style lang="scss" scoped>

</style>
