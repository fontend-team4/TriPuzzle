import { defineStore } from "pinia"
import { ref } from "vue"

export const MessageModalStore=defineStore('MessageModal',()=>{
  const messageModal = ({ title = '訊息', message, status }) => {
  const typeClasses = {
    success: 'bg-green-500 hover:bg-green-700',
    error: 'bg-primary-600 hover:bg-primary-700',
  }
  const buttonClass = typeClasses[status]
  if (document.querySelector('#custom_modal')) {
    document.querySelector('#modal_title').textContent = title // 更新標題
    document.querySelector('#modal_message').textContent = message // 更新訊息
    document
      .querySelector('#modal_button')
      .classList.remove(
        'bg-green-500',
        'hover:bg-green-700',
        'bg-primary-600',
        'hover:bg-primary-700'
      )
    document
      .querySelector('#modal_button')
      .classList.add(...buttonClass.split(' ')) // 更新class
    document.querySelector('#custom_modal').showModal() // 顯示 Modal
    return
  }

  const modalHTML = `
    <dialog id="custom_modal" class="modal">
      <div class="modal-box text-center w-[450px] h-[250px]">
        <h3 id="modal_title" class="text-xl font-bold font-bold mb-4">${title}</h3>
        <p id="modal_message" class="py-4">${message}</p>
        <div class="modal-action justify-center">
          <button id="modal_button" class="btn ${buttonClass} w-[80%] text-white py-3 rounded-full font-medium  mt-4" onclick="document.querySelector('#custom_modal').close()">確定</button>
        </div>
      </div>
    </dialog>
  `
  // 動態插入 Modal 到 body
  document.body.insertAdjacentHTML('beforeend', modalHTML)

  // 顯示 Modal
  document.querySelector('#custom_modal').showModal()
  }
  return {messageModal}
})