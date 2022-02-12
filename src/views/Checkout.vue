<template>
  <main>
    <form>
      <div class="checkout">
        <h1 class="title">結帳</h1>
        <!-- stepper -->
        <Stepper :currentStep="currentStep" />
        <!-- form-area -->
        <FormArea :currentStep="currentStep" />
      </div>

      <!-- cart -->
      <Cart />
      <!-- form-control button -->
      <FormControl :currentStep="currentStep" />
    </form>
    <!-- Modal -->
    <Modal />
  </main>
</template>

<script>
import Stepper from '../components/Stepper.vue'
import FormControl from '../components/FormControl.vue'
import FormArea from '../components/FormArea'
import Cart from '../components/Cart.vue'
import Modal from '../components/Modal'

export default {
  components: {
    Stepper,
    FormArea,
    FormControl,
    Cart,
    Modal
  },
  data() {
    return {
      currentStep: 0
    }
  },
  methods: {
    urlStep() {
      // 讀取 params 來切換 step
      let paramsStep = Number(this.$route.params.step)
      if (paramsStep < 1 || paramsStep > 3) {
        this.$router.push({ params: { step: '1' } })
      } else {
        this.currentStep = --paramsStep
      }
    }
  },
  watch: {
    '$route.params.step': function () {
      this.urlStep()
    }
  },
  created() {
    // 重新整理
    this.urlStep()
  }
}
</script>

<style lang="scss">
// mobile first
// main layout
main {
  max-width: $breakpoint;
  margin: 16px auto 40px;
}

// 結帳
.checkout {
  h1.title {
    margin-left: 15px;

    color: var(--main-text-black);
    font-size: 1.5rem;
    line-height: 2.375rem;
  }

  .step-panel {
    margin: 24px 16px 24px 15px;
    transition: all 0.35s ease-in-out;
  }

  .form-area {
    margin: auto 14px auto 15px;
    transition: all 0.5s ease-in-out;
  }
}

.cart {
  margin: 0 15px 32px;
  padding: 16px;
  border: 1px solid var(--cart-border);
  border-radius: 8px;

  transition: all 0.65s ease-out;
}

.form-control {
  margin: auto 15px;
  transition: all 0.35s ease-in-out;
}

// desktop layout
@media screen and (min-width: $breakpoint) {
  main {
    max-width: $view-width;
    margin: 80px auto 120px auto;
  }

  // 採用 grid 排版
  form {
    padding: 0 #{percentage(165px / $view-width)};
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto;
    grid-gap: 0 30px;
  }

  // 結帳
  .checkout {
    grid-column: 1 / span 6;

    h1.title {
      margin-left: unset;

      color: var(--main-text-black);
      font-size: 2rem;
    }
    .step-panel {
      margin: 48px 0 64px;
    }

    .form-area {
      margin: unset;
    }
  }

  .cart {
    grid-area: 1/8 / span 2 / span 5;

    margin: 86px 0 0 5px;

    height: 492px;
    border: 1px solid var(--cart-border);
    border-radius: 8px;
    padding: 32px 24px;
  }

  .form-control {
    grid-area: 2 / 1 / span 1 / span 6;
    margin: 0;
  }
}
</style>
