<template>
  <div class="cart">
    <h3 class="title">購物籃</h3>
    <!-- product-list -->
    <div class="product-list">
      <div
        v-for="(product, index) in OrderList"
        :key="index"
        class="product d-flex"
      >
        <img
          :src="require(`@/${product.img}`)"
          :alt="product.name"
          loading="lazy"
        />
        <div class="order d-flex justify-content-between">
          <div class="order-panel">
            <h5 class="order-product">{{ product.name }}</h5>
            <div class="order-quantity d-flex align-items-center">
              <button
                type="button"
                @click.stop.prevent="minusAmount(product.id)"
                class="minus"
              >
                <!-- SVG -->
                <svg
                  width="12"
                  height="3"
                  viewBox="0 0 12 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.37207"
                    y="2.40001"
                    width="1.8"
                    height="10.8411"
                    rx="0.9"
                    transform="rotate(-90 0.37207 2.40001)"
                    fill="black"
                  />
                </svg>
                <!-- SVG -->
              </button>
              <input
                type="number"
                v-model="product.amount"
                class="order-input"
              />
              <button
                type="button"
                @click.stop.prevent="addAmount(product.id)"
                class="plus"
              >
                <!-- SVG -->
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.77384 12.125C6.25283 12.125 6.64113 11.7367 6.64113 11.2577V7.31819H10.3762C10.8281 7.31819 11.1944 6.95188 11.1944 6.50001C11.1944 6.04814 10.8281 5.68182 10.3762 5.68182H6.64113V1.74229C6.64113 1.2633 6.25283 0.875 5.77384 0.875C5.29485 0.875 4.90655 1.2633 4.90655 1.74229V5.68182H1.17145C0.719584 5.68182 0.353271 6.04814 0.353271 6.50001C0.353271 6.95188 0.719584 7.31819 1.17145 7.31819H4.90655V11.2577C4.90655 11.7367 5.29485 12.125 5.77384 12.125Z"
                    fill="black"
                  />
                </svg>
                <!-- SVG -->
              </button>
            </div>
          </div>
          <p class="product-price">{{ product.price | currencyFormat }}</p>
        </div>
      </div>
    </div>

    <!-- cost-summary -->
    <div class="cost-summary">
      <div class="cost d-flex justify-content-between">
        <span>運費</span>
        <p id="shipping-fee">
          {{ shipmentFee === 0 ? '免費' : shipmentFee | currencyFormat }}
        </p>
      </div>
      <div class="cost d-flex justify-content-between">
        <span>小計</span>
        <p id="sub-total">{{ bill | currencyFormat }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const productList = [
  {
    id: 0,
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    img: 'assets/product/ripped-jeans.svg'
  },
  {
    id: 1,
    name: '刷色直筒牛仔褲',
    price: 1299,
    img: 'assets/product/straight-jeans.svg'
  }
]

export default {
  props: {
    shipment: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      OrderList: ''
    }
  },
  watch: {
    OrderList: {
      deep: true,
      handler: function () {
        for (let order of this.OrderList) {
          // 修正資料型別
          typeof order.amount !== Number &&
            (order.amount = Number(order.amount))
          // 修正數量
          order.amount < 0 && (order.amount = 0)
        }

        const UserOrder = this.OrderList.map((product) => ({
          id: product.id,
          amount: product.amount
        }))
        localStorage.setItem('UserOrder', JSON.stringify(UserOrder))
      }
    },
    bill: function () {
      this.$emit('bill-Info', this.bill)
    }
  },
  computed: {
    shipmentFee() {
      return this.shipment === 'standard' ? 0 : 500
    },
    bill() {
      let subTotal = 0
      subTotal += this.shipmentFee
      // 用forEach常常會失效
      for (let product of this.OrderList) {
        subTotal += product.price * product.amount
      }
      return subTotal
    }
  },
  methods: {
    minusAmount(selectProductId) {
      this.OrderList = this.OrderList.map((product) => {
        if (product.amount > 0 && product.id === selectProductId) {
          return { ...product, amount: --product.amount }
        }
        return product
      })
    },
    addAmount(selectProductId) {
      this.OrderList = this.OrderList.map((product) => {
        if (product.id === selectProductId) {
          return { ...product, amount: ++product.amount }
        }
        return product
      })
    }
  },
  filters: {
    currencyFormat(currency) {
      return currency.toLocaleString('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
      })
    }
  },
  created() {
    // 從 localStorage 讀取商品數量
    this.OrderList = productList.map((product) => {
      if (localStorage.getItem('UserOrder')) {
        const userOrder = JSON.parse(localStorage.getItem('UserOrder'))
        // 比對商品ID
        for (let order of userOrder) {
          if (order.id === product.id) {
            return { ...product, amount: order.amount }
          }
        }
      } else {
        // 商品數量初始值
        return { ...product, amount: 1 }
      }
    })
    // 傳送總金額初始值
    this.$emit('bill-Info', this.bill)
  },
}
</script>

<style lang="scss">
// mobile first
// cart
.cart {
  background-color: var(--cart-background);
  h3.title {
    display: none;
  }
}

.product-list {
  margin-bottom: 16px;
  max-height: calc((102px * 2) + 18px);
  overflow: scroll;

  // 產品價格
  p {
    color: var(--cart-price);
  }

  img {
    width: 100px;
    object-fit: cover;
    border-radius: 4px;
  }

  input[type='number'] {
    // 去除外框
    appearance: none;
    border: none;

    width: 53.12px;
    margin: 0 5.42px;

    background-color: transparent;
    font-size: 14px;
    line-height: 17px;
    text-align: center;

    color: var(--cart-price);
    font-family: var(--quantity-input-font);
    font-weight: var(--quantity-input-weight);
  }

  button {
    height: 26px;
    width: 27px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--cart-button-background);
    transition: background-color ease-out 0.35s;

    svg > * {
      fill: var(--cart-button-svg);
      transition: fill ease-out 0.35s;
    }

    &:hover,
    &:active {
      background-color: var(--cart-button-svg);

      svg > * {
        fill: var(--cart-button-background);
      }
    }
  }
}

.product {
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0px;
  }
}

.order {
  flex-direction: column;
  align-items: flex-end;

  margin-left: 21px;
  width: 100%;

  h5.order-product {
    color: var(--main-text-black);
    margin-bottom: 18px;
    font-weight: 400;

    text-align: right;
  }
  .order-quantity {
    margin-bottom: 17px;
  }

  .product-price {
    font-size: 16px;
    line-height: 22px;
  }
}

.cost {
  border-top: 1px solid var(--cart-border);
  padding: 16px percentage((24.25px - 16px) / 313px) 16px
    percentage((16.78px - 16px) / 313px);

  &:last-child {
    padding-bottom: 0px;
  }

  span {
    color: var(--main-text-black);
    font-size: 14px;
  }

  p {
    color: var(--cart-price);
    font-size: 14px;
    line-height: 17px;
  }
}

// desktop layout
@media screen and (min-width: $breakpoint) {
  // cart
  .cart {
    h3.title {
      display: block;
      color: var(--main-text-black);
      font-size: 18px;
      line-height: 22px;
    }
  }

  .product-list {
    margin: 32px 0px;
    max-height: calc((100px * 2) + 32px);
  }
  // 產品列間距
  .product {
    margin-bottom: 32px;
  }

  .order {
    // 消除 mobile layout 排版
    flex-direction: row;
    align-items: flex-start;

    h5.order-product {
      text-align: left;
    }
  }
}
</style>
