<template>
  <div class="create-post">
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Blog Başlığı Giriniz" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Kapak Fotoğrafı Yükle</label>
          <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg" />
          <button class="preview" :class="{ 'button-inactive': !blogStore.blogPhotoFileURL }"></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Quill from 'quill';
import { blogStore } from '../stores/index';
window.Quill = Quill;
// const ImageResize = require('quill-image-resize-module').default;
// Quill.register('modules/imageResize', ImageResize);
export default {
  name: 'CreatePost',
  data() {
    return {
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          ImageResize: {},
        },
      },
    };
  },
  computed: {
    blogStore() {
      return blogStore();
    },
  },
};
</script>
<style lang="scss"></style>
