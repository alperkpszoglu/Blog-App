<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogStore.blogPhotoPreview" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input maxlength="30" type="text" placeholder="Blog Başlığı Giriniz" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Kapak Fotoğrafı Yükle</label>
          <input type="file" ref="blogPhoto" @change="fileUpload" id="blog-photo" accept=".png, .jpg, .jpeg" />
          <button class="preview" @click="openPreview" :class="{ 'button-inactive': !blogStore.blogPhotoFileURL }">
            Fotoğraf Önizle
          </button>
          <span style="font-weight: 700">Seçilen Dosya: {{ blogStore.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <QuillEditor theme="snow" v-model:content="blogHTML" contentType="html" toolbar="full" />
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Değişiklikleri Kaydet</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Değişiklikleri İncele</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { blogStore } from '../stores/index';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlogCoverPreview from '../components/BlogCoverPreview.vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'EditBlogView',
  components: {
    QuillEditor,
    BlogCoverPreview,
  },
  data() {
    return {
      error: null,
      errorMsg: null,
      file: null,
      routeId: null,
      currentBlog: null,
    };
  },
  async mounted() {
    this.routeId = this.$route.params.blogid;
    this.currentBlog = await blogStore().blogs.find((blog) => {
      return blog.id === this.routeId;
    });
    blogStore().setBlogState(JSON.parse(JSON.stringify(this.currentBlog)));
  },
  computed: {
    blogStore() {
      return blogStore();
    },
    profileUserName() {
      return this.blogStore.profileUserName;
    },
    blogCoverPhotoName() {
      return this.blogStore.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.blogStore.blogTitle;
      },
      set(payload) {
        blogStore().updateBlogTitle(payload);
      },
    },
    blogHTML: {
      get() {
        return this.blogStore.blogHTML;
      },
      set(payload) {
        blogStore().newBlogPost(payload);
      },
    },
  },
  methods: {
    fileUpload() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      blogStore().blogPhotoName = fileName;
      blogStore().blogPhotoFileURL = URL.createObjectURL(this.file);
    },
    openPreview() {
      blogStore().blogPhotoPreview = !blogStore().blogPhotoPreview;
    },
    async updateBlog() {
      const headers = blogStore().getToken();

      if (this.file) {
        // if there is a file then change the cover photo
        headers['Content-Type'] = 'multipart/form-data';

        const formData = new FormData();
        formData.append('file', this.$refs.blogPhoto.files[0]);
        axios.post(import.meta.env.VITE_BASE_URL + '/api/File/UploadImage', formData, { headers: headers });
        headers['Content-Type'] = 'application/json';

        axios
          .get(
            import.meta.env.VITE_BASE_URL + `/api/Blog/UpdateBlog?blogId=${this.routeId}&blogHtml=${this.blogHTML}&blogTitle=${this.blogTitle}&blogCoverPhotoURL=${this.file.name}`,
            { headers: headers }
          )
          .then(() => {
            blogStore().getAllBlogs();
            Swal.fire({
              icon: 'success',
              title: 'Başarılı!',
              text: 'Basariyla postu guncellediniz!',
            });

            this.$route.push({ name: 'ViewBlog' });
          });
      }
    },
  },
};
</script>
<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
      overflow-x: hidden;
      overflow-y: hidden;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>
