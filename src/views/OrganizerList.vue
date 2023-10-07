
<script setup lang="ts">
import OrganizerCard from '../components/OrganizerCard.vue'
import type { OrganizerItem } from '@/organizer'
import { ref , computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { Ref } from 'vue'
import { watchEffect } from 'vue'
import OrganizerService from '@/services/OrganizerService'
import NProgress from 'nprogress'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'

const events: Ref<OrganizerItem[]> = ref([])
const router = useRouter()

const totalEvent = ref<number>(0)
const perPage = ref<number>(2)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

// EventService.getEvent(3, props.page).then((response: AxiosResponse<EventItem[]>) => {
//   events.value = response.data
//   console.log(events.value)
// })

OrganizerService.getOrganizer(3, props.page).then((response: AxiosResponse<OrganizerItem[]>) => {
  events.value = response.data
  totalEvent.value = response.headers['x-total-count']
}).catch(() => {
  router.push({ name: 'NetworkError' })
})

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  OrganizerService.getOrganizer(3, toPage).then((response: AxiosResponse<OrganizerItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
    next()
  }).catch(() => {
    next({ name: 'NetworkError'})
  })
})

const hasNextPage = computed(()=>{
  // first calculate the total page
  const totalPages = Math.ceil(totalEvent.value / 3)
  return props.page.valueOf() < totalPages
})

</script>
<template>
  <h1 class="text-center text-3xl font-bold mb-4">Organizers for Good</h1>
  <main class="flex flex-col items-center">
    <OrganizerCard
      v-for="event in events"
      :key="event.id"
      :event="event"
      class="mb-4"
    ></OrganizerCard>
    <div class="flex w-290 pagination mt-4">
      <RouterLink
        :to="{ name: 'organizer', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="text-left mr-auto"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'organizer', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        class="text-right ml-auto"
      >
        Next Page
      </RouterLink>
    </div>
  </main>
</template>

<!-- <style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> -->
