import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { blogStore } from '../src/stores/index';

const app = createApp(App);

app.use(createPinia());

app.use(router);

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Alper Kapusızoğlu`;
  next();
});

router.beforeEach(async (to, from, next) => {
  const user = await blogStore().user;

  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        if (user.isAdmin) {
          return next();
        }
        return next({ name: 'Home' });
      }
      return next();
    }
    return next({ name: 'Home' });
  }

  return next();
});

app.mount('#app');
