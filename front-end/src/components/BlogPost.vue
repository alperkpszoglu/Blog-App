<template>
  <div class="blog-wrapper" :class="{'no-user': !user}">
    <div class="blog-content">
      <div>
        <h2 v-if="post.heroSection">{{ post.title }}</h2>
        <h2 v-else>{{ post.blogTitle }}</h2>
        <p v-if="post.heroSection">{{ post.blogPost }}</p>
        <p class="text-wrapper" v-else v-html="post.blogHtml"></p>

        <router-link class="link link-light" v-if="post.heroSection" :to="{name: 'Register'}">
          Giriş/Kayıt Ol
          <ArrowIcon class="arrow arrow-light" />
        </router-link>
        <router-link class="link" v-else :to="{name: 'ViewBlog', params: {blogid: post.id}}">
          Blog görüntüle
          <ArrowIcon class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="post.heroSection" :src="getImageUrl(post.photo)" alt="" />
      <img v-else :src="getImageUrlPosts(post.blogCoverPhotoURL)" alt="" />
    </div>
  </div>
</template>

<script>
import ArrowIcon from '../assets/Icons/arrow-right-light.svg';
import { blogStore } from '../stores/index';
export default {
  name: 'blogPost',
  props: ['post'],
  components: {
    ArrowIcon,
  },
  methods: {
    getImageUrl: (name) => {
      return new URL(import.meta.env.VITE_BASE_URL + `/Images/${name}`, import.meta.url).href;
    },
    getImageUrlPosts: (name) => {
      return new URL(import.meta.env.VITE_BASE_URL + `/Images/${name}`, import.meta.url).href;
    },
  },
  computed: {
    user() {
      return blogStore().user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }
    div {
      max-width: 375px;
      padding: 72px 24px;
      @media (min-width: 700px) {
        padding: 0 24px;
      }
      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }
      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }
      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;
        &:hover {
          border-bottom-color: #303030;
        }
      }
      .link-light {
        &:hover {
          border-bottom-color: #ffff;
        }
      }
    }
  }
  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    @media (min-width: 700px) {
      order: 2;
    }
    @media (min-width: 800px) {
      flex: 4;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &:nth-child(even) {
    .blog-content {
      order: 2;
    }
    .blog-photo {
      order: 1;
    }
  }
}
.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: #fff;
  }
}

.text-wrapper {
  width: 100%;
  height: 5rem;
  overflow: hidden;
}

</style>