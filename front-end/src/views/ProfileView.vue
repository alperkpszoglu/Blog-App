<template>
  <div class="profile">
    <Modal v-if="isModalActive" :modalMessage="modalMessage" @close-modal="closeModal" />
    <div class="container">
      <h2>Kullanıcı Ayarları</h2>
      <div class="profile-info">
        <div class="initials">{{ blogStore.profileInitials }}</div>
        <div class="admin-badge">
          <AdminIcon class="icon" />
          <span>{{ blogStore.profileIsAdmin ? 'Admin' : 'Kullanıcı' }}</span>
        </div>
        <div class="input">
          <label for="firstName">Ad:</label>
          <input maxlength="20" type="text" id="firstName" v-model="blogStore.profileFirstName" />
        </div>
        <div class="input">
          <label for="lastName">Soyad:</label>
          <input maxlength="20" type="text" id="lastName" v-model="blogStore.profileLastName" />
        </div>
        <div class="input">
          <label for="username">Kullanıcı Adı:</label>
          <input maxlength="20" type="text" id="username" v-model="blogStore.profileUserName" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="blogStore.profileEmail" />
        </div>
        <button @click="updateProfile">Kaydet</button>
      </div>
    </div>
  </div>
</template>
<script>
import { blogStore } from '../stores/index';
import AdminIcon from '../assets/Icons/user-crown-light.svg';
import Modal from '../components/Modal.vue';
export default {
  components: {
    AdminIcon,
    Modal,
  },
  data() {
    return {
      isModalActive: null,
      modalMessage: 'Değişiklikler Kaydedildi!',
    };
  },
  computed: {
    blogStore() {
      return blogStore();
    },
  },
  methods: {
    closeModal() {
      this.isModalActive = !this.isModalActive;
    },
    updateProfile() {
      this.isModalActive = true;
      window.scrollTo(0, 0);
      blogStore().updateProfile();
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;
        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>
