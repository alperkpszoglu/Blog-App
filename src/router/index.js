import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogsView from '../views/BlogsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Ana Sayfa'
      }
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: BlogsView,
      meta: {
        title: 'Bloglar'
      }
    },
  ],
});

export default router;
