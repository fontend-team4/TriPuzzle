<script setup>
 import { ChevronDownIcon  } from "@heroicons/vue/24/outline";
</script>

<template>
<div class="collapse m-[-1rem] ">
              <input type="checkbox" />
              <div class="collapse-title flex justify-between items-center p-0 pl-[1rem]">
                <div>
                 <h2 class="text-xl font-bold text-stone-950">行程一</h2>
                 <p class="text-sm text-gray-600">2024/11/01</p>
                </div> 
                <ChevronDownIcon class="size-3" />
              </div>
              <div class="collapse-content p-0 pl-[1rem]">
                  <div class="p-2 my-[0.5rem] bg-[#f4f4f4] rounded-xl">
                    <h3 class="text-black text-semibold">第一天</h3>
                    <!-- 景點數量要跟我的行程連動 -->
                    <p>11/01 週五，4個景點</p>
                  </div>
                  <div class="p-2  my-[0.5rem] bg-[#f4f4f4] rounded-xl">
                    <h3 class="text-black text-semibold">第二天</h3>
                    <p>11/02 週六，0個景點</p>
                  </div>
                  <div class="p-2  my-[0.5rem] bg-[#f4f4f4] rounded-xl">
                    <h3 class="text-black text-semibold">第三天</h3>
                    <p>11/03 週日，0個景點</p>
                  </div>
              </div>
          </div>
</template>