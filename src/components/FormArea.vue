<template>
  <div class="form-area">
    <!-- part 1 -->
    <transition name="fade" mode="out-in">
      <div class="form-part" v-if="currentStep === 0" key="part-1">
        <div class="form-row">
          <h3 class="title">寄送地址</h3>
        </div>
        <!-- row 1 -->
        <div class="form-row d-flex justify-content-between">
          <div class="form-select mobile-short desktop-short">
            <label for="gender">稱謂</label>
            <select name="gender" v-model="User.gender" id="gender" required>
              <option value="male" selected>先生</option>
              <option value="female">女士</option>
            </select>
          </div>
          <div class="form-input mobile-long desktop-long">
            <label for="name">姓名</label>
            <input
              type="text"
              v-model="User.name"
              id="name"
              name="name"
              placeholder="請輸入姓名"
              required
            />
          </div>
          <!-- row-2 -->
        </div>
        <!-- row 2 -->
        <div class="form-row desktop-flex justify-content-between">
          <div class="form-input desktop-middle">
            <label for="phone">電話</label>
            <input
              type="tel"
              v-model="User.phone"
              id="phone"
              name="phone"
              placeholder="請輸入行動電話"
              required
            />
          </div>
          <div class="form-input desktop-middle">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="User.email"
              id="email"
              name="email"
              placeholder="請輸入電子郵件"
              required
            />
          </div>
        </div>
        <!-- row 3 -->
        <div class="form-row desktop-flex justify-content-between">
          <div class="form-select desktop-short">
            <label for="regin">縣市</label>
            <select name="regin" v-model="User.regin" id="regin" required>
              <option value="" selected disabled>請選擇縣市</option>
              <option
                v-for="(city, index) in taiwan"
                :key="index"
                :value="city.value"
              >
                {{ city.name }}
              </option>
            </select>
          </div>
          <div class="form-input desktop-long">
            <label for="address">地址</label>
            <input
              type="text"
              v-model="User.address"
              id="address"
              name="address"
              placeholder="請輸入地址"
              required
            />
          </div>
        </div>
      </div>

      <!-- part 2 -->
      <div class="form-part" v-else-if="currentStep === 1" key="part-2">
        <div class="form-row">
          <h3 class="title">運送方式</h3>
        </div>

        <label for="standard" class="form-radio d-flex align-content-center">
          <input
            type="radio"
            v-model="User.shipment"
            name="shipment"
            value="standard"
            id="standard"
            checked
            required
          />
          <div>
            <h5 class="title">標準運送</h5>
            <p>約 3~7 個工作天</p>
          </div>
          <span>免費</span>
        </label>

        <label for="dhl" class="form-radio">
          <input
            type="radio"
            v-model="User.shipment"
            name="shipment"
            value="dhl"
            id="dhl"
          />
          <div>
            <h5 class="title">DHL 貨運</h5>
            <p>48 小時內送達</p>
          </div>
          <span>$500</span>
        </label>
      </div>

      <!-- part 3 -->
      <div class="form-part" v-else-if="currentStep === 2" key="part-3">
        <div class="form-row">
          <h3 class="title">付款資訊</h3>
        </div>
        <!-- row 1 -->
        <div class="form-row">
          <div class="form-input desktop-long">
            <label for="owner">持卡人姓名</label>
            <input
              type="text"
              v-model="User.cardOwner"
              id="owner"
              name="card-owner"
              placeholder="John Don"
              required
            />
          </div>
        </div>
        <!-- row 2 -->
        <div class="form-row">
          <div class="form-input desktop-long">
            <label for="serial">卡號</label>
            <input
              type="number"
              v-model="User.serial"
              id="serial"
              name="serial"
              placeholder="1111 2222 3333 4444"
              required
            />
          </div>
        </div>
        <!-- row 3 -->
        <div class="form-row d-flex justify-content-between">
          <div class="form-input mobile-middle desktop-middle">
            <label for="thru">有效期限</label>
            <input
              type="text"
              v-model="User.thru"
              id="thru"
              name="thru"
              placeholder="MM/YY"
              required
            />
          </div>
          <div class="form-input mobile-middle desktop-middle">
            <label for="code">CVC / CCV</label>
            <input
              type="number"
              v-model="User.code"
              id="code"
              name="code"
              placeholder="123"
              required
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const taiwan = [
  { name: '台北市', value: 'Taipei' },
  { name: '新北市', value: 'NewTaipei' },
  { name: '桃園市', value: 'Taoyuan' },
  { name: '臺中市', value: 'Taichung' },
  { name: '臺南市', value: 'Tainan' },
  { name: '高雄市', value: 'Kaohsiung' },
  { name: '宜蘭縣', value: 'Yilan' },
  { name: '新竹縣', value: 'HsinchuCounty' },
  { name: '苗栗縣', value: 'Miaoli' },
  { name: '彰化縣', value: 'Changhua' },
  { name: '南投縣', value: 'Nantou' },
  { name: '雲林縣', value: 'Yunlin' },
  { name: '嘉義縣', value: 'ChiayiCounty' },
  { name: '屏東縣', value: 'Pingtung' },
  { name: '臺東縣', value: 'Taitung' },
  { name: '花蓮縣', value: 'Hualien' },
  { name: '澎湖縣', value: 'Penghu' },
  { name: '基隆市', value: 'Keelung' },
  { name: '新竹市', value: 'Hsinchu' },
  { name: '嘉義市', value: 'Chiayi' },
  { name: '連江縣', value: 'Lienchiang' },
  { name: '金門縣', value: 'Kinmen' }
]

export default {
  props: {
    currentStep: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      User: {
        gender: 'male',
        name: '',
        phone: '',
        email: '',
        regin: '',
        address: '',
        shipment: 'standard',
        cardOwner: '',
        serial: '',
        thru: '',
        code: ''
      },
      taiwan: taiwan
    }
  },
  watch: {
    // 使用字串可以單獨監聽物件裡的屬性
    'User.shipment': function () {
      this.$emit('shipment', this.User.shipment)
    },
    User: {
      deep: true,
      handler: function () {
        localStorage.setItem('UserInfo', JSON.stringify(this.User))
      }
    }
  },
  created() {
    localStorage.getItem('UserInfo') &&
      (this.User = JSON.parse(localStorage.getItem('UserInfo')))
  }
}
</script>

<style lang="scss">
// mobile first
// form-area
.form-area {
  select {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  // 用vue提供的 transition 標籤轉場淡出、淡入
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
    transition: opacity 0.35s ease-out;
  }

  .mobile-short {
    width: percentage(133px / 346px);
  }
  .mobile-middle {
    width: percentage(158px / 346px);
  }
  .mobile-long {
    width: percentage(183px / 346px);
  }

  // 偽元素產生 drop down 三角形
  .form-select {
    // drop down 三角形定位點
    position: relative;
    &::after {
      // 點擊可穿透偽元素
      pointer-events: none;

      position: absolute;
      top: calc(17px + 20px);
      transform: translate(-50%, 100%);
      right: 18px;

      content: '';
      border-style: solid;
      border-width: 5px 4.5px 0 4.5px;
      border-color: var(--select-triangle) transparent transparent transparent;
    }
  }
}

.form-row,
.form-radio {
  margin-bottom: 24px;
}

.desktop-flex {
  .form-input,
  .form-select {
    margin-bottom: 16px;
  }
}

.form-row,
label.form-radio {
  &:last-child {
    margin-bottom: 32px;
  }
}

.form-row {
  h3.title {
    font-size: 1.5rem;
    line-height: 1.5rem;
    color: var(--main-text-black);
  }

  input,
  select,
  label {
    font-size: 12px;
    line-height: 16px;
  }

  input,
  select {
    border: 1px solid var(--form-input-border);
    border-radius: 4px;
    height: 40px;

    width: 100%;

    padding: 12px 16px;

    background-color: transparent;
    color: var(--main-text-black);
    &:invalid {
      color: var(--placeholder);
    }
  }

  label {
    margin-bottom: 8px;
    display: block;
    color: var(--form-label-gray);
  }

  .desktop-long input {
    padding: 12px 18px;
  }
}

label.form-radio {
  border: 1px solid var(--radio-label-border);
  border-radius: 4px;

  display: block;
  cursor: pointer;
  height: 60px;
  padding: 11px 20px;

  display: flex;
  align-items: center;

  transition: border 0.35s ease-out;
  &:hover {
    border: 1px solid var(--main-text-black);
    h5 {
      font-weight: 400;
    }
  }

  // span 定位點
  position: relative;

  h5 {
    font-size: 14px;
    line-height: 20px;
    color: var(--radio-text);
    color: var(--radio-text);
  }

  p,
  span {
    font-size: 12px;
    line-height: 16px;
  }

  p {
    color: var(--radio-describe);
  }

  span {
    position: absolute;
    right: 20px;
    top: 13px;

    color: var(--radio-text);
  }

  input[type='radio'] {
    width: 20px;
    height: 20px;
    margin-right: 20px;

    appearance: none;
    border: 1px solid var(--radio-input-border);
    border-radius: 50%;
    background-color: var(--radio-input-background);

    transition: all 0.35s ease-in;
    &:checked {
      background-color: white;
      border: none;

      box-shadow: inset 0 0 0 6px var(--radio-input-inset);

      &::after {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;

        width: 100%;
        height: 100%;

        border-radius: 4px;
        border: 1px solid var(--main-text-black);
        // 讓這層元素被滑鼠穿透過去
        pointer-events: none;
      }

      & ~ * {
        font-family: Inter;
        h5 {
          font-weight: 400;
        }
      }
    }
  }
}

// desktop layout
@media screen and (min-width: 376px) {
  .form-area {
    .desktop-short {
      width: percentage(160px / $six-columns-width);
    }
    .desktop-middle {
      width: percentage(255px / $six-columns-width);
    }
    .desktop-long {
      width: percentage(350px / $six-columns-width);
    }
  }

  .desktop-flex {
    display: flex;

    .form-input,
    .form-select {
      margin-bottom: unset;
    }
  }

  .form-row {
    &:last-child {
      margin-bottom: 48px;
    }
  }

  label.form-radio {
    &:last-child {
      margin-bottom: 144px;
    }
  }
}
</style>
