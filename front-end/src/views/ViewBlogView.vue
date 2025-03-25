<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ currentBlog.blogTitle }}</h2>
      <h4>
        Oluşturulma Tarihi: {{ new Date(this.currentBlog.createdDate).toLocaleString('tr-TR', { dateStyle: 'long' }) }}
      </h4>
      <img :src="getImageUrlPosts(currentBlog.blogCoverPhotoURL)" />
      <div class="post-content ql-editor" v-html="currentBlog.blogHtml"></div>
    </div>
  </div>
</template>

<script>
import { blogStore } from '../stores/index';
import { reactive } from 'vue';

export default {
  name: 'ViewBlog',
  data() {
    const currentBlog = reactive({});
    return {
      currentBlog,
    };
  },
  async mounted() {
    const blog = await blogStore().blogs.find((blog) => blog.id === this.$route.params.blogid);
    Object.assign(this.currentBlog, blog);
  },
  methods: {
    getImageUrlPosts: (name) => {
      return new URL(import.meta.env.VITE_BASE_URL + `/Images/${name}`, import.meta.url).href;
    },
  },
};
</script>
<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
