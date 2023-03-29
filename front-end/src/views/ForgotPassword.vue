<template>
  <div class="reset-password">
    <Modal v-if="isModalActive" :modalMessage="modalMessage" @close-modal="closeModal" />
    <Loading v-if="isLoad" />
    <div class="form-wrapper">
      <form class="reset">
        <p class="have-account">
          <router-link class="router-link" :to="{ name: 'Register' }">Giriş Yap'a Geri Dön</router-link>
        </p>
        <h2>Şifreni Yenile</h2>
        <p>Şifreni mi unuttun? Yenilemek için email giriniz</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Yenile</button>
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
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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
      email: '',
      modalMessage: '',
      isLoad: false,
    };
  },
  methods: {
    resetPassword() {
      this.isLoad = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = 'Mail Adresinize Şifre Yenileme linki Gönderildi';
          this.isModalActive = true;
          this.isLoad = false;
        })
        .catch(() => {
          this.modalMessage = 'Böyle Bir Mail Adresi Mevcut Değildir';
          this.isModalActive = true;
          this.isLoad = false;
        });
        this.email = '';
    },
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
