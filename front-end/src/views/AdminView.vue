<template>
  <div class="admin">
    <div class="container">
      <h2>Admin Paneli</h2>
      <div class="admin-info">
        <h2>Admin Ekle</h2>
        <div class="input">
          <input
            placeholder="Adminlik vermek istediğiniz Email adresiniz giriniz"
            type="text"
            id="addAdmins"
            v-model="adminEmail"
          />
        </div>
        <span>{{ this.functionMsg }}</span>
        <button @click="addAdmin" class="button">Gönder</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { blogStore } from '../stores/index';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      adminEmail: null,
    };
  },
  methods: {
    addAdmin() {
      const headers = blogStore().getToken();
      axios
        .get(import.meta.env.VITE_BASE_URL + `/User/SetAdminRole?email=${this.adminEmail}`, { headers: headers })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Kullanıcıyı Admin Olarak Başarıyla Eklediniz!',
          });
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Admin Ekleme Sırasında Hata Alındı!',
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      span {
        font-size: 14px;
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
