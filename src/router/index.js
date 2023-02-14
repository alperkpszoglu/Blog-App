import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogsView from '../views/BlogsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Ana Sayfa',
      },
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: BlogsView,
      meta: {
        title: 'Bloglar',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: 'Giriş Yap',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: {
        title: 'Kayıt Ol',
      },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'Şifreni Değiştir',
      },
    },
  ],
});

export default router;
