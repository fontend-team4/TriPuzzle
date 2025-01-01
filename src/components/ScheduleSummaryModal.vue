<script setup>
import { inject, onMounted, ref, watch } from "vue"
import { jsPDF } from "jspdf"
import "../assets/fonts/NotoSansTC.js"
import axios from "axios"
import EmailScheduleSummary from "./EmailScheduleSummary.vue"
import { DocumentArrowDownIcon } from "@heroicons/vue/24/outline"

const API_URL = process.env.VITE_HOST_URL
const token = localStorage.getItem("token")
const scheduleId = inject("scheduleId")
const schedulesData = ref("")
const scheduleName = ref("")
const schedulePlaces = ref("")
const groupedData = ref("")

const getSchedule = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  try {
    const response = await axios.get(`${API_URL}/schedules/${id}`, config)
    schedulesData.value = response.data
    scheduleName.value = response.data.title
    schedulePlaces.value = response.data.schedule_places
    const getAllDates = (startDate, endDate) => {
      const dates = []
      let currentDate = new Date(startDate)
      const lastDate = new Date(endDate)

      while (currentDate <= lastDate) {
        const dateString = currentDate.toISOString().slice(0, 10)
        dates.push(dateString)
        currentDate.setDate(currentDate.getDate() + 1)
      }

      return dates
    }

    const allDates = getAllDates(
      schedulesData.value.start_date,
      schedulesData.value.end_date
    )

    groupedData.value = allDates.map((date) => ({
      date,
      places:
        schedulePlaces.value.filter(
          (place) => place.which_date.slice(0, 10) === date
        ) || [],
    }))

    groupedData.value.forEach((item) => {
      item.places.sort((a, b) => a.order - b.order)
      item.places.forEach((place) => {
        const arrivalIsoString = place.arrival_time
        const arrivalDate = new Date(arrivalIsoString)
        const arrivalHours = String(arrivalDate.getUTCHours()).padStart(2, "0")
        const arrivalMinutes = String(arrivalDate.getUTCMinutes()).padStart(
          2,
          "0"
        )
        place.arrival_time = `${arrivalHours}:${arrivalMinutes}`

        const stayIsoString = place.stay_time
        const stayDate = new Date(stayIsoString)
        const stayHours = String(stayDate.getUTCHours()).padStart(2, "0")
        const stayMinutes = String(stayDate.getUTCMinutes()).padStart(2, "0")
        place.stay_time = `${stayHours}時${stayMinutes}分`
      })
    })
  } catch (error) {
    console.error(error)
  }
}

const scheduleSummary = ref(null)
const generatePDF = () => {
  const doc = new jsPDF()
  doc.setFont("NotoSansTC-VariableFont_wght", "normal")
  doc.setFontSize(12)

  const content = scheduleSummary.value
  const lines = content.innerText.split("\n")

  lines.forEach((line, i) => {
    doc.text(line, 10, 10 + i * 5) // 設定文字位置
  })

  doc.save("schedule_summary.pdf")
}

const scheduleSummaryText = ref("")
watch(schedulesData, () => {
  getSchedule(scheduleId.value)
  if (scheduleSummary.value) {
    scheduleSummaryText.value = scheduleSummary.value.innerText.split("\n")
  }
})

onMounted(() => {
  getSchedule(scheduleId.value)
})
</script>

<template>
  <dialog id="scheduleSummaryModal" class="modal">
    <div class="modal-box w-screen md:w-[480px] relative">
      <form method="dialog">
        <div class="w-full h-10">
          <button
            class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>
        </div>
        <div class="h-[600px] overflow-y-scroll pb-12" ref="scheduleSummary">
          <h3 class="mb-5 text-2xl font-bold text-center">
            {{ scheduleName }}
          </h3>
          <br />
          <div v-for="(item, index) in groupedData" :key="item.date">
            <div class="font-bold">第{{ index + 1 }}天 ({{ item.date }})</div>
            <div v-if="item.places.length === 0">此天尚未安排行程</div>
            <div v-for="place in item.places" :key="place.id">
              {{ place.arrival_time }} {{ place.places.name }} (停留
              {{ place.stay_time }})
            </div>
            <br />
          </div>
        </div>
        <div
          class="absolute bottom-0 right-0 flex w-full h-20 gap-3 px-6 py-4 bg-white border-t border-gray"
        >
          <EmailScheduleSummary :scheduleSummaryText="scheduleSummaryText" />
          <button
            @click="generatePDF"
            class="w-full h-12 px-5 py-3 font-medium text-center text-white bg-primary-600 hover:bg-primary-700 rounded-3xl"
          >
            <DocumentArrowDownIcon class="inline-block w-7 h-7 pe-2" />
            <span>匯出 PDF</span>
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
        ✕
      </button>
      <button>close</button>
    </form>
  </dialog>
</template>
