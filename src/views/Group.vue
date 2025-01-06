<script setup>
import { ref, onMounted, defineProps } from "vue"
import { RouterView, useRouter,useRoute } from "vue-router"

// 引入子組件
import ShareGroup from "@/components/splitbill/ShareGroup.vue"
import AccountForm from "@/components/splitbill/AccountForm.vue"
import AccountList from "@/components/splitbill/AccountList.vue"
import BalanceSummary from "@/components/splitbill/BalanceSummary.vue"

const router = useRouter()
const route = useRoute()
// const scheduleId = route.query.scheduleId; // 從 query 中獲取 scheduleId
// console.log(scheduleId);
const scheduleId = route.params.scheduleId; // 獲取路徑參數中的 scheduleId
console.log('當前行程 ID:', scheduleId);


import axios from "axios"

const groupMembers = ref([])
const token = localStorage.getItem("token");
const API_URL = process.env.VITE_HOST_URL;


onMounted(async() => {
  console.log('mounted');
  await getMember();
})


const getMember = async()=>{
  const config = {
    headers: {
      Authorization: token,
    },
  };

  // 更新shareMembers
  try {
    const {data} = await axios.get(
      `${API_URL}/usersSchedules/1/users`,
      config
    );
    groupMembers.value = data;
    console.log("groupMembers", groupMembers.value);
  } catch (err) {
    console.error(err.message);
  }
}




onMounted(() => {
  router.push(`/groups/${scheduleId}/account-form`)
})
</script>

<template>
  <div class="bg-primary-700">
    <div class="border-round bg-primary-700 w-[48rem] mx-auto h-[100vh]">
      <div class="title mb-4">
        <div class="flex text-center justify-center items-center p-4">
          <img
            src="../assets/svg/logo-light.svg"
            alt="Logo"
            class="w-12 mr-2"
          />
          <h1 class="text-[36px] text-center font-bold text-primary-100 my-2">
            TriAccount 旅費分帳
          </h1>
          <router-link to="/planner" >
            <button class="btn absolute top-8 right-10 bg-primary-100 border-round text-primary-700">回到行程</button>  
          </router-link>
        </div>
        <h2 class="text-[64px] font-bold text-center text-primary-50">
          {{ groupMembers.title}} 
        </h2>
      </div>

      <nav
        class="flex justify-center space-x-4 flex-row bg-primary-700 p-4 shadow-md"
      >
        <ul class="flex flex-row text-primary-100 gap-10">
          <li class="hover:text-primary-300">
            <router-link :to="{ name: 'AccountForm', params: { scheduleId: scheduleId } }" class="nav-link"
              >新增花費</router-link
            >
          </li>
          <li class="hover:text-primary-300">
            <router-link :to="{ name: 'AccountList', params: { scheduleId: scheduleId } }" class="nav-link"
              >花費列表</router-link
            >
          </li>
          <li class="hover:text-primary-300">
            <router-link :to="{ name: 'BalanceSummary', params: { scheduleId: scheduleId } }" class="nav-link"
              >分帳狀態</router-link
            >
          </li>
          <li class="hover:text-primary-300">
            <router-link :to="{ name: 'ShareGroup', params: { scheduleId: scheduleId } }" class="nav-link"
              >群組成員</router-link
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
