<template>
  <transition name="delay">
    <div class="modal" v-show="modal">
      <!-- Modal background-->
      <transition name="fade">
        <div
          class="modal-background"
          v-show="modal"
          @click.stop.prevent="modal = false"
        ></div>
      </transition>

      <!-- Modal dialog -->
      <transition name="slide">
        <div
          v-show="modal"
          @click.stop.prevent="modal = true"
          class="modal-dialog"
        >
          <div
            class="modal-header d-flex justify-content-between align-items-center"
          >
            <h3 class="title">結帳結果</h3>
            <button
              @click.stop.prevent="modal = false"
              class="close d-flex justify-content-between align-items-center"
            >
              <!-- icon shock SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xml:space="preserve"
                width="100%"
                height="100%"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="m12 10.586 4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                ></path>
              </svg>
              <!-- SVG -->
            </button>
          </div>
          <div class="modal-body">
            <p>原始資料輸出如下...</p>
            <pre>{{ modalFormat }}</pre>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      UserInfo: {},
      bill: -1
    }
  },
  computed: {
    modalFormat() {
      const content = Object.assign(
        {},
        {
          salutation: `${this.UserInfo.gender === 'male' ? 'Mr' : 'Mrs'}`,
          username: `${this.UserInfo.name}`,
          phone: `${this.UserInfo.phone}`,
          email: `${this.UserInfo.email}`,
          city: `${this.UserInfo.regin}`,
          addr: `${this.UserInfo.address}`,
          shippingFee: this.UserInfo.shipment === 'standard' ? 0 : 500,
          ccname: `${this.UserInfo.cardOwner}`,
          cardnumber: `${this.UserInfo.serial}`,
          expdate: `${this.UserInfo.thru}`,
          ccv: `${this.UserInfo.code}`,
          totalPrice: this.bill
        }
      )
      return content
    }
  },
  // 要比事件發送早一個階段開始監聽
  beforeMount() {
    // 接收 modal 要顯示的資料
    this.$bus.$on('userInfo', (userInfo) => {
      this.UserInfo = userInfo
    })
    this.$bus.$on('bill', (bill) => {
      this.bill = bill
    })
    // 用 event bus 監聽「確認下單」
    this.$bus.$on('modal', (visible) => {
      this.modal = visible
    })
  },
  beforeDestroy() {
    this.$bus.$off('userInfo')
    this.$bus.$off('bill')
    this.$bus.$off('modal')
  }
}
</script>

<style lang="scss" scoped>
.modal {
  // modal background
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: auto;

  padding: 0 10%;

  //  延遲關閉modal，顯示 modal background 過場動畫
  //  最少要跟整個元件的最後一個 leave-active 動畫同時
  --modal-leave-delay: 0.35s;

  &.delay-leave-active {
    transition: none var(--modal-leave-delay);
  }
  .modal-background {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100vw;
    height: 100%;
    // for 不支援漸變屬性瀏覽器
    background-color: var(--modal-background-around);

    background: radial-gradient(
      circle at center,
      var(--modal-background-center),
      var(--modal-background-around)
    );
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);

    // for modal background
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    &.fade-enter-to,
    &.fade-leave {
      opacity: 1;
    }

    &.fade-enter-active {
      transition: opacity 1.8s ease-in-out;
    }

    &.fade-leave-active {
      transition: opacity var(--modal-leave-delay) ease-in-out;
    }
  }
}

.modal-dialog {
  // 供過渡動畫定位
  position: relative;

  margin: $modal-height auto 0;
  border-radius: 0.5rem;
  min-width: 300px;

  padding: 1.5rem;
  background-color: var(--modal-dialog-background);
  // css scan #26
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  backdrop-filter: blur(8px);

  color: var(--main-text-black);

  .modal-header {
    margin-bottom: 1.5rem;
  }

  h3.title {
    font-size: 2rem;
  }

  p {
    font-size: 14px;
    line-height: 17px;
  }

  /* The Close Button */
  button.close {
    cursor: pointer;
    fill: var(--placeholder);
    transition: transform 0.35s ease-out;
    transform: scale(100%);

    svg {
      width: 1.5rem;
    }

    &:hover {
      transform: scale(160%);
      svg {
        fill: var(--form-label-gray);
      }
    }
  }
}

// for modal dialog
.slide-enter,
.slide-leave-to {
  transform: translate(0, calc(-#{$modal-height} - 100%));
}

.slide-enter-to,
.slide-leave {
  transform: none;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s ease-in-out;
}

@media screen and (min-width: $breakpoint) {
  .modal-dialog {
    max-width: 500px;
    padding: 1.5rem;
  }
}
</style>
