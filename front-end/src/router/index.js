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
import EditBlogView from '../views/EditBlogView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Ana Sayfa',
        requiresAuth: false,
      },
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: BlogsView,
      meta: {
        title: 'Bloglar',
        requiresAuth: false,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: 'Giriş Yap',
        requiresAuth: false,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: {
        title: 'Kayıt Ol',
        requiresAuth: false,
      },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'Şifreni Değiştir',
        requiresAuth: false,
      },
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: CreatePostView,
      meta: {
        title: 'Blog Oluştur',
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      meta: {
        title: 'Profil',
        requiresAuth: true,
      },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      meta: {
        title: 'Admin',
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/post-preview',
      name: 'BlogPreview',
      component: BlogPreview,
      meta: {
        title: 'Blog Önizleme',
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/view-blog/:blogid',
      name: 'ViewBlog',
      component: ViewBlogView,
      meta: {
        title: 'Blog Görüntüle',
        requiresAuth: false,
      },
    },
    {
      path: '/edit-blog/:blogid',
      name: 'EditBlog',
      component: EditBlogView,
      meta: {
        title: 'Blog Düzenle',
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
});


export default router;
