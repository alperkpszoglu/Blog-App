<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">BlogApp</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">ana sayfa</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">bloglar</router-link>
          <router-link v-if="blogStore.profileIsAdmin" class="link" :to="{ name: 'CreatePost' }">blog ekle</router-link>
          <router-link v-if="!blogStore.user" class="link" :to="{ name: 'Login' }">giriş yap/kayıt ol</router-link>
        </ul>

        <div v-show="blogStore.user" v-if="!mobile" class="profile" ref="profile" @click="profileMenuToggle">
          <span>{{ blogStore.profileInitials }}</span>
          <div v-show="profileToggle" class="profile-menu">
            <div class="info">
              <p class="initials">{{ blogStore.profileInitials }}</p>
              <div class="right">
                <p>{{ blogStore.profileFirstName }} {{ blogStore.profileLastName }}</p>
                <p>{{ blogStore.profileUserName }}</p>
                <p>{{ blogStore.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link :to="{ name: 'Profile' }" class="option">
                  <UserIcon class="icon" />
                  <p>Profil</p>
                </router-link>
              </div>
              <div v-if="blogStore.profileIsAdmin" class="option">
                <router-link :to="{ name: 'Admin' }" class="option">
                  <AdminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div @click="signOut" class="option">
                <SignOutIcon class="icon" />
                <p>Çıkış Yap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <IconMenu @click="toggleMobile" class="icon-menu" v-show="mobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">ana sayfa</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">bloglar</router-link>
        <router-link v-if="blogStore.profileIsAdmin" class="link" :to="{ name: 'CreatePost' }">blog ekle</router-link>
        <router-link v-if="!blogStore.user" class="link" :to="{ name: 'Login' }">giriş yap/kayıt ol</router-link>
        <router-link v-if="mobile && blogStore.user" class="link" :to="{ name: 'Profile' }">profil</router-link>
        <router-link v-if="mobile && blogStore.profileIsAdmin" class="link" :to="{ name: 'Admin' }">admin</router-link>
        <router-link v-if="blogStore.user" class="link" to="#" @click="signOut">çıkış yap</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import IconMenu from '../assets/Icons/bars-regular.svg';
import UserIcon from '../assets/Icons/user-alt-light.svg';
import AdminIcon from '../assets/Icons/user-crown-light.svg';
import SignOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
import { blogStore } from '../stores/index';
import { useRouter } from 'vue-router';

export default {
  name: 'nav',
  components: {
    IconMenu,
    UserIcon,
    AdminIcon,
    SignOutIcon,
  },
  data() {
    return {
      mobile: null, // mobile or not
      mobileNav: null,
      windowsWidth: null,
      profileToggle: false,
    };
  },
  computed: {
    blogStore() {
      return blogStore();
    },
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen(); // it'll be run when the app created
  },
  methods: {
    checkScreen() {
      this.windowsWidth = window.innerWidth;
      if (this.windowsWidth < 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobile() {
      this.mobileNav = !this.mobileNav;
    },
    profileMenuToggle(e) {
      if (e.target === this.$refs.profile) {
        this.profileToggle = !this.profileToggle;
      }
    },
    signOut() {
      localStorage.removeItem('token');
      this.$router.push({name: 'Home'});
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
}

.link {
  font-weight: 600;
  padding: 0 8px;
  transition: 0.3s color ease;

  &:hover {
    color: #1eb8b8;
  }
}

nav {
  display: flex;
  padding: 1.5rem 0;

  .branding {
    display: flex;
    align-items: center;

    .header {
      font-weight: 600;
      font-size: 1.5rem;
      color: #000;
      text-decoration: none;
    }
  }

  .nav-links {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ul {
      margin-right: 2rem;

      .link {
        margin-right: 2rem;
      }

      .link:last-child {
        margin-right: 0;
      }
    }

    .profile {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
      background-color: #303030;

      span {
        pointer-events: none;
      }

      .profile-menu {
        position: absolute;
        top: 60px;
        right: 0;
        width: 250px;
        background-color: #303030;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        .info {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #fff;

          .initials {
            position: initial;
            width: 40px;
            height: 40px;
            background-color: #fff;
            color: #303030;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .right {
            flex: 1;
            margin-left: 1rem;

            p:nth-child(1) {
              font-size: 14px;
            }
            p:nth-child(2),
            p:nth-child(3) {
              font-size: 12px;
            }
          }
        }

        .options {
          padding: 15px;

          .option {
            text-decoration: none;
            color: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 12px;

            .icon {
              width: 18px;
              height: auto;
            }

            p {
              font-size: 14px;
              margin-left: 12px;
            }
            &:last-child {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
  }
}

.icon-menu {
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 1.5rem;
  height: 1.5rem;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;

  .link {
    padding: 15px 0px;
    color: #fff;
  }
}

// transition for mobile-nav
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}
.mobile-nav-enter-from {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
