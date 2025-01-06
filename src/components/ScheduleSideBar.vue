<script setup>
import { ref, provide } from "vue"
import { GlobeAsiaAustraliaIcon } from "@heroicons/vue/24/outline"
import SchedulesList from "./SchedulesList.vue"
import ScheduleDetail from "@/components/ScheduleDetail.vue"
import TransportationWay from "./TransportationWay.vue"

const scheduleToggleShow = ref(true)

// SchedulesList 開關
const listOpen = ref(false)
// 傳給父層 MainComponent
defineExpose({ listOpen })

const listToggle = () => {
  listOpen.value = !listOpen.value
  scheduleToggleShow.value = !scheduleToggleShow.value
}
// 給 SchedulesList 關閉自己
provide("listToggle", listToggle)

// schedule detail 開關
const detailOpen = ref(false)
const scheduleId = ref("")
const detailToggle = async (id) => {
  scheduleId.value = id
  listOpen.value = !listOpen.value
  detailOpen.value = await !detailOpen.value
  listOpen.value = !listOpen.value
}
// 給 SchedulesList 進入 ScheduleDetail
// 給 ScheduleDetail 關閉自己
provide("detailToggle", detailToggle)
provide("scheduleId", scheduleId)

// 給 ScheduleDetail 關閉全部
provide("listAndDetailToggle", () => {
  listOpen.value = !listOpen.value
  scheduleToggleShow.value = !scheduleToggleShow.value
  detailOpen.value = !detailOpen.value
})

// TransportationWay 開關
const transportationOpen = ref(false)
const transportationToggle = () => {
  transportationOpen.value = !transportationOpen.value
}

// 給 ScheduleDetail 進入 TransportationWay
// 給 TransportationWay 關閉自己
provide("transportationToggle", transportationToggle)
</script>

<template>
  <!-- 行程側欄開關 toggle -->
  <div
    v-if="scheduleToggleShow"
    class="schedule flex items-center absolute top-12 lg:top-5 right-0 text-white w-[56px] hover:w-[86px] h-10 py-2 ps-3 pe-5 bg-yellow-500 rounded-s-full shadow-lg hover:cursor-pointer z-30"
    @click="listToggle"
  >
    <span class="inline-block w-6 h-6"><GlobeAsiaAustraliaIcon /></span>
    <p class="text-sm pl-0.5 font-medium hidden">行程</p>
  </div>
  <SchedulesList v-if="listOpen" class="fixed top-0 right-0 z-20" />
  <ScheduleDetail v-if="detailOpen" class="fixed top-0 right-0 z-20" />
  <TransportationWay
    v-if="transportationOpen"
    class="absolute top-0 right-0 z-20"
  />
</template>
