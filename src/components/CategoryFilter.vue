<script setup>
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/solid"
import { ref, onMounted, watch, defineEmits } from "vue"

const defaultCategories = [
  {
    name: "景點",
    icon: "🌄",
    params: ["tourist_attraction", "museum", "campground", "church"],
  },
  { name: "收藏", icon: "❤️", params: ["lodging", "embassy"] },
  { name: "美食", icon: "🍴", params: ["food", "restaurant", "cafe", "bar"] },
  {
    name: "購物",
    icon: "🛍️",
    params: ["department_store", "supermarket", "shopping_mall", "store"],
  },
]

const additionalCategories = ref([
  { name: "住宿", icon: "🏨", params: ["lodging", "embassy"] },
  { name: "租車站", icon: "🚗", params: ["car_rental"] },
  {
    name: "交通站",
    icon: "🚉",
    params: [
      "light_rail_station",
      "bus_station",
      "subway_station",
      "train_station",
      "transit_station",
    ],
  },
  { name: "充電樁", icon: "⚡", params: ["electrician", "electronics_store"] },
  { name: "機場", icon: "✈️", params: ["airport"] },
  { name: "水族館", icon: "🐠", params: ["aquarium"] },
  { name: "公園", icon: "🏞️", params: "park" },
  { name: "動物園", icon: "🐾", params: ["zoo"] },
  { name: "其他", icon: "🛠️", params: ["point_of_interest"] },
])

const categories = ref([...defaultCategories])

const emit = defineEmits("update-categories")

// 監聽 categories 的變化
watch(categories, (newCategories) => {
  emit("update-categories", newCategories)
})

// 新增分類
const addCategory = (category) => {
  if (!categories.value.some((item) => item.name === category.name)) {
    categories.value.push(category)
    additionalCategories.value = additionalCategories.value.filter(
      (item) => item.name !== category.name
    )
    emit("update-categories", categories.value)
  }
}

// 移除分類
const removeCategory = (index) => {
  const removed = categories.value.splice(index, 1)[0]
  if (!additionalCategories.value.some((item) => item.name === removed.name)) {
    additionalCategories.value.push(removed)
  }
  emit("update-categories", categories.value)
}

// 點擊外框關閉
const closeModal = () => {
  const dialog = document.getElementById("CategoryFilter")
  dialog?.close()
}

// 保存分類
const saveCategories = () => {
  localStorage.setItem("categories", JSON.stringify(categories.value))
  closeModal()
}

onMounted(() => {
  const savedCategories = localStorage.getItem("categories")
  if (savedCategories) {
    const loadedCategories = JSON.parse(savedCategories)
    categories.value = [
      ...defaultCategories,
      ...loadedCategories.filter(
        (category) =>
          !defaultCategories.some(
            (defaultCategory) => defaultCategory.name === category.name
          )
      ),
    ]

    // 移除已經存在於 categories 中的預設分類
    additionalCategories.value = additionalCategories.value.filter(
      (item) =>
        !categories.value.some((category) => category.name === item.name)
    )
  }
})
</script>

<template>
  <div class="ml-auto pt-[3px]">
    <button
      type="button"
      class="inline-flex items-center justify-center rounded-full w-[24px] h-[24px] border-none cursor-pointer transition duration-300 p-0"
      style="box-sizing: border-box"
      onclick="CategoryFilter.showModal()"
    >
      <AdjustmentsHorizontalIcon
        class="w-[1em] h-[1em] fill-current text-black"
      />
    </button>
  </div>

  <dialog
    id="CategoryFilter"
    class="modal flex items-center justify-center bg-black bg-opacity-50 top-0 right-0 bottom-0 left-0"
    @click.self="closeModal"
  >
    <div
      class="modal-box w-full min-h-screen p-0 bg-white rounded-lg shadow-lg lg:my-4 lg:min-h-3/4 overflow-y-auto"
    >
      <header class="flex align-center w-full justify-end">
        <form method="dialog">
          <button class="btn btn-xl btn-circle btn-ghost">✕</button>
        </form>
      </header>

      <div class="filter-body flex flex-col overflow-hidden">
        <!-- 我的分類 -->
        <div class="block-my flex flex-col w-[100%-36px] h-full mx-4">
          <div class="flex flex-col justify-start items-center mb-2">
            <h3 class="text-2xl font-bold text-black mb-1">我的分類</h3>
            <p class="text-sm text-gray-500 mb-4">拖動即可排序</p>
            <!-- 待新增:拖曳功能 -->
            <div
              class="list-group flex justify-start space-between flex-wrap w-full h-1/2 gap-2 px-6 pb-8"
            >
              <button
                v-for="(category, index) in categories"
                :key="category.name"
                class="list-group-item btn btn-sm bg-primary-100 text-primary-600 rounded-3xl border-transparent justify-center items-center gap-0 px-0.5 hover:bg-primary-700 hover:shadow-lg hover:text-primary-100 hover:scale-105 hover:border-transparent"
              >
                {{ category.icon }} {{ category.name }}
                <span
                  v-if="
                    !defaultCategories.some(
                      (defaultCategory) =>
                        defaultCategory.name === category.name
                    )
                  "
                >
                  <button
                    @click="removeCategory(index)"
                    class="text-primary-600 hover:text-red-500 px-1 btn btn-xs btn-ghost"
                  >
                    <p class="text-center">✕</p>
                  </button>
                </span>
                <span
                  v-if="
                    defaultCategories.some(
                      (defaultCategory) =>
                        defaultCategory.name === category.name
                    )
                  "
                >
                  <p class="text-center px-0.5"></p>
                </span>
              </button>
            </div>
          </div>
        </div>
        <!-- 新增分類 -->
        <div class="block-other flex flex-col w-[100%-36px] mx-4 h-30">
          <div class="flex flex-col justify-center items-center mb-2">
            <p class="text-xl font-bold text-black mt-4 mb-4">點擊新增更多</p>
            <div
              class="other-list-group flex justify-start items-start flex-wrap w-full gap-2 px-6 pb-8"
            >
              <button
                v-for="category in additionalCategories"
                :key="category.name"
                class="list-group-item btn btn-sm bg-primary-100 text-primary-600 rounded-3xl border-transparent justify-center items-center gap-0 px-0.5 hover:bg-primary-700 hover:shadow-lg hover:text-primary-100 hover:scale-105 hover:border-transparent"
                @click="addCategory(category)"
              >
                {{ category.icon }} {{ category.name }}
                <span>
                  <button
                    @click="addCategory(index)"
                    class="text-primary-600 hover:text-red-500 px-1 btn btn-xs btn-ghost"
                  >
                    <p class="text-center">+</p>
                  </button>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 按鈕區域 -->
      <footer
        class="footer-area absolute left-0 bottom-0 w-full gap-1 bg-white overflow-hidden"
      >
        <span class="footer-btn flex items-center gap-3 py-3 px-5">
          <button
            class="btn btn-lg rounded-full w-1/2 btn-outline text-primary-700 hover:bg-primary-200 hover:border-primary-700 hover:text-primary-700"
            @click="closeModal"
          >
            取消
          </button>
          <button
            class="btn btn-lg rounded-full w-1/2 bg-primary-700 text-primary-100 border-transparent hover:bg-primary-800 hover:border-primary-100"
            @click="saveCategories"
          >
            儲存
          </button>
        </span>
      </footer>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        close
      </button>
    </form>
  </dialog>
</template>

<style scoped>
.block-my {
  border-bottom: 1px dashed gray;
}

.footer-area {
  border-top: 1px solid rgba(182, 174, 174, 0.897);
}
</style>
