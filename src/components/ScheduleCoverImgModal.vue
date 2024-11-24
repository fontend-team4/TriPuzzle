<template>
  <div>
    <label class="custom-checkbox">
      <input type="checkbox" aria-label="Custom Checkbox" />
      <span class="checkbox-style"></span>
      <span class="checkbox-label">Custom Checkbox</span>
    </label>
  </div>



</template>

<style scoped>
/* 隱藏預設的 checkbox */
.custom-checkbox input[type="checkbox"] {
  display: none;
}

/* 外部容器樣式 */
.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 8px; /* 間距 */
  cursor: pointer;
}

/* 自定義 checkbox 樣式 */
.custom-checkbox .checkbox-style {
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  border: 2px solid #ccc;
  border-radius: 50%; /* 設置圓角為 50%，讓它變成圓形 */
  position: relative;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* 勾選符號樣式 */
.custom-checkbox .checkbox-style::after {
  content: "✔"; /* 或者使用 FontAwesome 的圖標 */
  position: absolute;
  color: white;
  font-size: 12px; /* 符號大小可適配圓形 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0); /* 初始隱藏 */
  transition: transform 0.3s ease;
}

/* 當勾選時改變背景與邊框顏色 */
.custom-checkbox input[type="checkbox"]:checked + .checkbox-style {
  background-color: #4caf50; /* 綠色背景 */
  border-color: #4caf50; /* 可選：改變邊框顏色 */
}

/* 當勾選時顯示對勾 */
.custom-checkbox input[type="checkbox"]:checked + .checkbox-style::after {
  transform: translate(-50%, -50%) scale(1);
}

/* 聚焦時增加樣式 */
.custom-checkbox input[type="checkbox"]:focus + .checkbox-style {
  outline: 2px solid #4caf50;
  outline-offset: 2px;
}

/* Label 樣式 */
.custom-checkbox .checkbox-label {
  font-size: 16px;
  color: #333;
}
</style>
