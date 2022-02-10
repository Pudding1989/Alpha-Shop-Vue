<template>
  <div
    class="form-control d-flex justify-content-between"
    :class="{ initial: currentStep === 0 }"
  >
    <button
      @click.stop.prevent="previousBtn()"
      type="button"
      class="btn"
      id="previous"
    >
      <!-- SVG -->
      <svg
        width="21"
        height="9"
        viewBox="0 0 21 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.85981 0.116733C5.6729 -0.0389109 5.36985 -0.0389109 5.18293 0.116733L0.140187 4.31579L0.0840028 4.37195C-0.0467075 4.53002 -0.0245865 4.74876 0.148335 4.88605L5.19108 8.88989L5.25866 8.93468C5.44823 9.03856 5.70562 9.01808 5.86777 8.87648L5.92156 8.8202C6.04631 8.66236 6.02172 8.44802 5.85166 8.31301L1.67891 5H20.0238L20.1094 4.99194C20.3315 4.94961 20.5 4.74546 20.5 4.5C20.5 4.22386 20.2868 4 20.0238 4H1.87229L5.85981 0.680368L5.91519 0.625171C6.04442 0.469841 6.02596 0.255083 5.85981 0.116733Z"
          fill="black"
        />
      </svg>
      <!-- SVG -->
      上一步
    </button>

    <button @click.stop.prevent="nextBtn()" type="button" class="btn" id="next">
      {{ currentStep === 2 ? '確認下單' : '下一步' }}
      <!-- SVG -->
      <svg
        v-if="currentStep < 2"
        width="21"
        height="9"
        viewBox="0 0 21 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.6402 0.116733C14.8271 -0.0389109 15.1302 -0.0389109 15.3171 0.116733L20.3598 4.31579L20.416 4.37195C20.5467 4.53002 20.5246 4.74876 20.3517 4.88605L15.3089 8.88989L15.2413 8.93468C15.0518 9.03856 14.7944 9.01808 14.6322 8.87648L14.5784 8.8202C14.4537 8.66236 14.4783 8.44802 14.6483 8.31301L18.8211 5H0.476191L0.390594 4.99194C0.168451 4.94961 0 4.74546 0 4.5C0 4.22386 0.213198 4 0.476191 4H18.6277L14.6402 0.680368L14.5848 0.625171C14.4556 0.469841 14.474 0.255083 14.6402 0.116733Z"
          fill="white"
        />
      </svg>
      <!-- SVG -->
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      required: true
    }
  },
  methods: {
    previousBtn() {
      this.currentStep > 0 &&
        this.$router.push({
          name: 'checkout',
          params: { step: `${this.currentStep}` }
        })
    },
    nextBtn() {
      this.currentStep < 2 &&
        this.$router.push({
          name: 'checkout',
          params: { step: `${this.currentStep + 2}` }
        })
    }
  }
}
</script>

<style lang="scss">
// mobile first
.form-control {
  padding-top: 24px;
  border-top: 1px solid var(--form-control-border);

  // mobile layout 首個 Step 預設按鈕狀態
  &.initial {
    button#previous {
      display: none;
    }
    button#next {
      flex-grow: 1;
    }
  }

  .btn {
    height: 46px;
    width: percentage(156px / 345px);
    border-radius: 8px;
  }

  button#previous {
    text-align: left;
    color: var(--button-font-color);
    transition: color 0.35s ease-out;

    svg {
      margin-right: 12.5px;
    }

    path {
      fill: var(--button-font-color);
      transition: fill 0.35s ease-out;
    }

    &:hover {
      color: var(--theme-pink);
      path {
        fill: var(--theme-pink);
      }
    }
  }

  button#next {
    background-color: var(--theme-pink);
    color: white;

    svg {
      margin-left: 13.5px;
    }
    // 按鈕長度縮放
    transition: all 0.35s ease-out;
    &:hover {
      background-color: var(--theme-deep-pink);
    }
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(246, 117, 153, 0.5);
    }
  }
}

// desktop layout
@media screen and (min-width: 376px) {
  .form-control {
    .btn {
      width: percentage(174px / $six-columns-width);
    }
    // desktop layout 首個 Step 預設按鈕狀態
    // 消除 mobile layout 的按鈕狀態
    &.initial {
      button#previous {
        display: inline-block;
        visibility: hidden;
      }
      button#next {
        flex-grow: 0;
      }
    }
  }
}
</style>
