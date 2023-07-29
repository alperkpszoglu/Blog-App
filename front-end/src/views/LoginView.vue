<template>
  <div class="form-wrapper">
    <form class="login">
      <p class="have-account">
        Hesabınız yok mu?
        <router-link class="router-link" :to="{ name: 'Register' }">Kayıt Ol</router-link>
      </p>
      <h2>Giriş Yap</h2>
      <div class="inputs">
        <div class="input">
          <input type="email" v-model="email" placeholder="Email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" v-model="password" placeholder="Şifreniz" />
          <password class="icon" />
        </div>
        <div v-show="error.isTrue" class="error">{{ error.msg }}</div>
      </div>
      <router-link class="forgot-password" to="#">Şifrenizi Mi Unuttunuz?</router-link>
      <button @click.prevent="signin">Giriş Yap</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>
<script>
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import { blogStore } from '../stores/index';
import axios from 'axios';
export default {
  name: 'Login',
  components: {
    email,
    password,
  },
  data() {
    return {
      password: '',
      email: '',
      error: {
        isTrue: null,
        msg: '',
      },
    };
  },
  methods: {
    signin() {
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(() => {
      //     this.$router.push({ name: 'Home' });
      //     this.error.isTrue = false;
      //     this.error.msg = '';
      //   }
      // )
      axios
        .post(import.meta.env.VITE_BASE_URL + '/api/Auth/login', { email: this.email, password: this.password })
        .then((res) => {
          localStorage.setItem('token', res.data);
        }).then(()=>{
          blogStore().getCurrentUser();
          this.$router.push({ name: 'Home' });
          this.error.isTrue = false;
          this.error.msg = '';
          blogStore().getAllBlogs();
        })
        .catch((error) => {
          this.error.isTrue = true;
          this.error.msg = 'Email veya Şifre yanlış girdiniz';
        });
    },
  },
};
</script>
<style lang="scss">
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

    .forgot-password {
      color: #000;
      text-decoration: none;
      cursor: pointer;
      font-size: 14px;
      margin: 1rem 0 2rem;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
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
}
</style>
