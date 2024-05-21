<template>
  <div class="form-wrapper">
    <form class="register">
      <p class="have-account">
        Zaten Hesabınız var mı?
        <router-link class="router-link" :to="{ name: 'Login' }">Giriş Yap</router-link>
      </p>
      <h2>Kayıt Ol</h2>
      <div class="inputs">
        <div class="input">
          <input maxlength="20" type="text" v-model="firstname" placeholder="Ad" />
          <user class="icon" />
        </div>
        <div class="input">
          <input maxlength="20" type="email" v-model="lastname" placeholder="Soyad" />
          <user class="icon" />
        </div>
        <div class="input">
          <input maxlength="124" type="email" v-model="email" placeholder="Email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input maxlength="20" type="text" v-model="username" placeholder="Kullanıcı Adı" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="password" v-model="password" placeholder="Şifre" />
          <password class="icon" />
        </div>
        <div v-show="error.isTrue" class="error">{{ error.msg }}</div>
      </div>
      <button @click.prevent="register">Kayıt Ol</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>
<script>

import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import user from '../assets/Icons/user-alt-light.svg';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      error: {
        isTrue: null,
        msg: '',
      },
    };
  },
  methods: {
    async register() {
      try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(hotmail|gmail)\.com$/; // regex for emails

        if (!emailRegex.test(this.email)) {
        this.error.isTrue = true;
        this.error.msg = 'Lütfen Geçerli Email Giriniz!';
        return;
      }

        if (
          this.email !== '' &&
          this.lastname !== '' &&
          this.firstname !== '' &&
          this.password !== '' &&
          this.username !== ''
        ) {
          this.error.isTrue = false;
          this.error.msg = '';

          await axios.post(import.meta.env.VITE_BASE_URL + '/api/Auth/register', {
            firstName: this.firstname,
            lastName: this.lastname,
            userName: this.username,
            email: this.email,
            password: this.password,
          });
          this.$router.push({ name: 'Login' });
        } else {
          this.error.isTrue = true;
          this.error.msg = 'Lütfen Tüm Alanları Doldurunuz!';
        }
      } catch (err) {
        this.error.isTrue = true;
        this.error.msg = 'Böyle Bir Mail Adresi veya Kullanıcı Adı Mevcuttur';
      }
    },
  }
};
</script>
<style lang="scss">
.register {
  h2 {
    max-width: 350px;
  }
}

.form-wrapper {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .have-account {
    margin-bottom: 2rem;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 2rem;
      color: #303030;
      margin-bottom: 2.25rem;

      @media (min-width: 900px) {
        font-size: 2.25rem;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.5rem;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .angle {
      background-color: #fff;
      display: none;
      position: absolute;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url('../assets/background.png');
    width: 100%;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}</style>
