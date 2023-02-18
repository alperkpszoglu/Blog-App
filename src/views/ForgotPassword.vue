<template>
  <div class="reset-password">
    <Modal v-if="isModalActive" @close-modal="closeModal" />
    <Loading v-if="isLoad" />
    <div class="form-wrapper">
      <form class="reset">
        <h2>Şifreni Yenile</h2>
        <p>Şifreni mi unuttun? Yenilemek için email giriniz</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button>Yenile</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg';
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue';
export default {
  name: 'ForgotPassword',
  components: {
    email,
    Modal,
    Loading,
  },
  data() {
    return {
      isModalActive: null,
      email: null,
      modalMessage: '',
      isLoad: false,
    };
  },
  methods: {
    closeModal() {
      this.isModalActive = false;
      this.email = '';
    },
  },
};
</script>

<style lang="scss">
.reset-password {
  position: relative;
  .form-wrapper {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
