import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


let isUpload;
firebase.auth().onAuthStateChanged(() => {
  if (!isUpload) {
    const app = createApp(App);

    app.use(createPinia());
    app.use(router);

    router.beforeEach((to, from, next) => {
      document.title = `${to.meta.title} | Alper Kapusızoğlu`;
      next();
    });

    app.mount('#app');
  }
});
