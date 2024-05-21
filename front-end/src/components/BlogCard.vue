<template>
  <div class="blog-card">
    <div class="icons" v-show="isEditable">
      <div class="icon" @click="editBlog">
        <EditIcon class="edit" />
      </div>
      <div class="icon" @click="deleteBlog">
        <DeleteIcon class="delete" />
      </div>
    </div>

    <img :src="getImageUrl(post.blogCoverPhotoURL)" />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Gönderi Tarihi: {{ new Date(post.createdDate).toLocaleDateString('tr-TR', { dateStyle: long }) }}</h6>
      <router-link class="link" :to="{ name: 'ViewBlog', params: { blogid: post.id } }"
        >Görüntüle<ArrowIcon class="arrow"
      /></router-link>
    </div>
  </div>
</template>
<script>
import ArrowIcon from '../assets/Icons/arrow-right-light.svg';
import EditIcon from '../assets/Icons/edit-regular.svg';
import DeleteIcon from '../assets/Icons/trash-regular.svg';
import { blogStore } from '../stores/index';

export default {
  name: 'blogCard',
  props: ['post'],
  components: {
    ArrowIcon,
    DeleteIcon,
    EditIcon, 
  },
  methods: {
      getImageUrl: (name) => {
        return new URL(import.meta.env.VITE_BASE_URL + `/Images/${name}`, import.meta.url).href;
      },
    deleteBlog() {
      if (confirm('Blogu silmek istiyor musunuz?')) blogStore().RemoveBlog(this.post.id);
    },
    editBlog() {
      this.$router.push({ name: 'EditBlog', params: { blogid: this.post.id } });
    },
  },
  computed: {
    isEditable() {
      return blogStore().isEditable;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  transition: 0.5s ease all;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

.icons {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.5s ease all;
    &:hover {
      background-color: #303030;
      .edit,
      .delete {
        path {
          fill: #fff;
        }
      }
    }
    &:nth-child(1) {
      margin-right: 8px;
    }
    .edit,
    .delete {
      pointer-events: none;
      height: 15px;
      width: auto;
    }
  }
}

img {
  display: block;
  border-radius: 6px 6px 0 0;
  z-index: 1;
  width: 100%;
  min-height: 200px;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 5;
  padding: 2rem 1rem;
  color: #000;
}

h4 {
  padding-bottom: 3rem;
  font-size: 1.5rem;
  font-weight: 300;
}

h6 {
  font-weight: 400;
  font-size: 0.75rem;
  padding-bottom: 1rem;
}

.link {
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  font-weight: 600;
  padding-top: 1.2rem;
  font-size: 0.75rem;
  padding-bottom: 0.25rem;
  transition: 0.5s ease-in all;

  &:hover {
    color: rgba(48, 48, 48, 0.8);
  }
  .arrow {
    width: 10px;
  }
}
</style>
