import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogsView from '../views/BlogsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import AdminView from '../views/AdminView.vue';
import ProfileView from '../views/ProfileView.vue';
import CreatePostView from '../views/CreatePostView.vue';
import BlogPreview from '../views/BlogPreview.vue';
import ViewBlogView from '../views/ViewBlogView.vue';
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
    {
      path: '/create-post',
      name: 'CreatePost',
      component: CreatePostView,
      meta: {
        title: 'Blog Oluştur',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        title: 'Profil',
      },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      meta: {
        title: 'Admin',
      },
    },
    {
      path: '/post-preview',
      name: 'BlogPreview',
      component: BlogPreview,
      meta: {
        title: 'Blog Önizleme',
      },
    },
    {
      path: '/view-blog/:blogid',
      name: 'ViewBlog',
      component: ViewBlogView,
      meta: {
        title: 'Blog Görüntüle',
      },
    },
  ],
});

export default router;
