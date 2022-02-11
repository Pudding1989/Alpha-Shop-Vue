<template>
  <!-- Modal background-->
  <transition name="fade" mode="in-out">
    <div v-show="modal" @click.stop.prevent="modal = false" class="modal">
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
            <pre>{{ modalContent }}</pre>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    modalSignal: {
      type: Boolean,
      required: true
    },
    UserInfo: {
      type: Object,
      required: true
    },
    billInfo: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      modal: false
    }
  },
  computed: {
    modalContent() {
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
          totalPrice: this.billInfo
        }
      )
      return content
    }
  },
  watch: {
    modalSignal: function () {
      this.modal = true
      console.log(this.modalContent)
    }
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
  // for 不支援漸變屬性瀏覽器
  background-color: var(--modal-background-around);

  background: radial-gradient(
    circle at center,
    var(--modal-background-center),
    var(--modal-background-around)
  );
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.modal-dialog {
  // 供過渡動畫定位
  position: relative;

  margin: $modal-height auto 0;
  border-radius: 0.5rem;
  min-width: 100px;
  max-width: 500px;

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
    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  p {
    font-size: 14px;
    line-height: 17px;
  }

  /* The Close Button */
  button.close {
    cursor: pointer;
    width: 2rem;
    fill: var(--placeholder);
    transition: transform 0.35s ease-out;
    transform: scale(100%);

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

// for modal background
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.8s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.35s ease-in-out;
}
</style>
