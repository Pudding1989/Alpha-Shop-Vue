<template>
  <div class="step-panel d-flex justify-content-between">
    <div
      v-for="(step, index) in stepInfo"
      :key="index"
      class="step"
      :class="{ active: index === currentStep, check: index < currentStep }"
    >
      <div class="step-circle"></div>
      <div class="step-subject">{{ step }}</div>
    </div>
  </div>
</template>

<script>
const stepInfo = ['寄送地址', '運送方式', '付款資料']

export default {
  props: {
    currentStep: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      stepInfo: stepInfo
    }
  }
}
</script>

<style lang="scss">
// mobile first
// step-panel
.step {
  display: flex;
  align-items: center;

  position: relative;
  // 產生步驟內部數字
  @include genStepNumber(3);
  color: var(--step-disable);

  .step-circle {
    border-radius: 50%;
    width: 32px;
    height: 32px;

    // 對齊步驟內部數字
    display: flex;
    justify-content: center;
    align-items: center;
    // 預設未啟用狀態
    border: 1px solid var(--step-disable);
    transition: border 0.5s ease-out;

    text-align: center;
    // step 內部數字
    &::after {
      font-size: 1rem;
      line-height: 1rem;
    }
  }

  .step-subject {
    // 隱藏步驟標題
    font-size: 0;
  }

  // 首個 step 預設狀態
  &:first-child {
    .step-circle {
      color: white;
      background-color: var(--step-one-fill);
      border-color: var(--step-one-fill);
    }
  }

  // 前2個 step，產生連結線
  &:nth-child(-n + #{$total-step - 1}) {
    // 佔據未分配空間，顯示連接線
    flex-grow: 1;
    // 隱藏突出連接線
    overflow: hidden;
    .step-subject {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        // 手機版採取固定寬度
        left: 32px;

        top: 50%;
        transform: translateY(-50%);

        height: 2px;
        width: 30vw;
        // 預設未啟用狀態
        background-color: var(--step-disable);
        transition: background-color 0.5s ease-out 0.35s;
      }
    }
  }

  // 從第2個 step 開始遮擋連結線
  // 手機版採取固定寬度
  &:nth-child(n + #{$total-step - 1}) {
    margin-left: 32px;
  }

  transition: color 0.5s ease-out;
  // step 啟用、完成共用狀態
  &.active,
  &.check {
    color: var(--main-text-black);
    // step 連接線
    .step-subject::after {
      background-color: var(--step-line-active);
    }
  }

  // step 啟用狀態
  &.active {
    .step-circle {
      border-color: var(--main-text-black);
    }
  }

  //step 完成狀態
  &.check {
    .step-circle {
      border-color: var(--step-checked-fill);
      background-color: var(--step-checked-fill);
      // 勾號定位點
      position: relative;
      // step 內部勾號
      // * stock overflow 學來的奇技淫巧
      &::after {
        content: '';
        /* position the checkbox */
        position: absolute;
        // 應該只能手工對齊
        top: 15%;
        left: 35%;
        /* setting the checkbox */
        /* short arm */
        width: 6px;
        border-bottom: 3px solid white;
        /* long arm */
        height: 13px;
        border-right: 3px solid white;

        transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
  }
}

// desktop layout
@media screen and (min-width: 376px) {
  .step {
    .step-circle {
      width: 24px;
      height: 24px;
      // 步驟標題間距
      margin-right: 8px;

      // step 內部數字
      &::after {
        font-size: 0.75rem;
        line-height: 1rem;
      }
    }

    .step-subject {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    // 依照1400px 比例，調整連結線左側起始位置
    &:nth-child(-n + #{$total-step - 1}) {
      .step-subject {
        &::after {
          left: calc(100% + #{$view-min-width} * (32 / 1440));
        }
      }
    }

    // 從第2個 step 開始遮擋連結線
    &:nth-child(n + #{$total-step - 1}) {
      margin-left: percentage(32px / $six-columns-width);
    }

    //step 完成狀態
    // 調整step 內部勾號大小位置
    &.check {
      .step-circle {
        &::after {
          top: 12%;
          left: 31%;
          /* setting the checkbox */
          /* short arm */
          width: 5px;
          /* long arm */
          height: 11px;
        }
      }
    }
  }
}

// 處理 step 連接線
@media screen and (min-width: #{$view-min-width + 1px} ) and ( max-width: #{$view-width} ) {
  .step:nth-child(-n + #{$total-step - 1}) {
    .step-subject {
      &::after {
        left: calc(100% + 100vw * (32 / 1440));
      }
    }
  }
}

@media screen and (min-width: #{$view-width + 1px} ) {
  .step:nth-child(-n + #{$total-step - 1}) {
    .step-subject {
      &::after {
        left: calc(100% + 32px);
      }
    }
  }
}
</style>
