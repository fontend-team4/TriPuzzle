import { defineStore } from 'pinia';

export const MessageModalStore = defineStore('MessageModal', () => {
  const messageModal = ({ message, status }) => {
    const statusImage = {
      success: '/images/cat-7.png',
      error: '/images/cat-4.png'
    };
    const showImage = statusImage[status];
    if (document.querySelector('#message_modal')) {
      document.querySelector('#modal_message').textContent = message; // 更新訊息
      document.querySelector('#message_modal').showModal(); // 重新顯示
      return;
    }

    const modalHTML = `

    <dialog id="message_modal" class="modal overflow-y-hidden">
      <div class="modal-box w-full md:w-[450px] flex flex-col items-center justify-center h-[33%] text-center ">
        <img class="w-28 h-28 mx-auto" src="${showImage}">
        <p id="modal_message" class="py-4 text-center">${message}</p>
      </div>
    </dialog>`;

    // 動態插入 Modal 到 body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 顯示 Modal
    const modalElement = document.querySelector('#message_modal');
    modalElement.showModal();

    setTimeout(() => {
      modalElement.close();
      modalElement.remove(); // 移除 DOM 元素
    }, 1000);

    // 監聽 Modal 關閉事件以移除元素
    modalElement.addEventListener('close', () => {
      modalElement.remove(); // 確保 Modal 關閉後移除
    });
  };

  return {
    messageModal
  };
});
