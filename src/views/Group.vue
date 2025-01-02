<script setup>
import { ref, onMounted, defineProps } from "vue"
import { RouterView, useRouter } from "vue-router"

// 引入子組件
import ShareGroup from "@/components/splitbill/ShareGroup.vue"
import AccountForm from "@/components/splitbill/AccountForm.vue"
import AccountList from "@/components/splitbill/AccountList.vue"
import BalanceSummary from "@/components/splitbill/BalanceSummary.vue"

const router = useRouter()

onMounted(() => {
  router.push("/groups/account-form")
})
</script>

<template>
  <div class="bg-primary-700">
    <div class="border-round bg-primary-700 w-[48rem] mx-auto h-[100vh]">
      <div class="title mb-4">
        <div class="flex text-center justify-center p-4">
          <img
            src="../assets/svg/logo-light.svg"
            alt="Logo"
            class="w-12 mr-2"
          />
          <h1 class="text-[36px] text-center font-bold text-primary-100 my-2">
            TriAccount 旅費分帳
          </h1>
        </div>
        <h2 class="text-xl font-bold text-center text-primary-100">
          【 schedule.id 或 schedule.name 】
        </h2>
      </div>

      <nav
        class="flex justify-center space-x-4 flex-row bg-primary-700 p-4 shadow-md"
      >
        <ul class="flex flex-row text-primary-100 gap-10">
          <li class="hover:text-primary-300">
            <router-link to="/groups/account-form" class="nav-link"
              >新增花費</router-link
            >
          </li>
          <li class="hover:text-primary-300">
            <router-link to="/groups/account-list" class="nav-link"
              >花費列表</router-link
            >
          </li>
          <li class="hover:text-primary-300">
            <router-link to="/groups/balance-summary" class="nav-link"
              >分帳狀態</router-link
            >
          </li>
          <li class="hover:text-primary-300">
            <router-link to="/groups/share-group" class="nav-link"
              >編輯群組</router-link
            >
          </li>
        </ul>
      </nav>

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  justify-items: center;
  margin-top: 5px;
  margin-bottom: px;
  color: rgb(162, 157, 157);
}

.nav-link {
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
