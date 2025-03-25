<template>
  <div class="home">
    <BlogPost v-if="!user" :post="heroSection" />
    <BlogPost v-for="(post, index) in sampleBlogPosts" :key="index" :post="post" />
    <div class="blog-card-wrapper">
      <div class="container">
        <h3>Daha Fazla Blog Görüntüle</h3>
        <div class="blog-cards">
          <BlogCard :key="index" v-for="(post, index) in blogCardFeeds" :post="post" />
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>ASLA BİR GÖNDERİYİ KAÇIRMAYIN. ŞİMDİ KAYDOL!</h2>
        <router-link class="router-button" to="#"> hemen simdi kayit ol <ArrowIcon class="arrow arrow-light" /> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';
import ArrowIcon from '../assets/Icons/arrow-right-light.svg';
import { blogStore } from '../stores/index.js';
export default {
  components: {
    BlogPost,
    BlogCard,
    ArrowIcon,
  },
  data() {
    return {
      heroSection: {
        title: 'Hello World!',
        blogPost:
          'Merhaba! Benim adım Alper ve bu benim kişisel blogum. Bu blog sayfasında, teknoloji ve yazılım dünyasına dair merak ettiklerimi, deneyimlerimi ve düşüncelerimi sizlerle paylaşacağım.',
        heroSection: true,
        photo: 'coding.jpg',
      },
    };
  },
  computed: {
    sampleBlogPosts() {
      return blogStore().sampleBlogPosts;
    },
    blogCardFeeds() {
      return blogStore().blogCardFeeds;
    },
    user(){
      return blogStore().user;
    }
  },
};
</script>

<style scoped lang="scss">
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}

h3 {
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 2rem;
}
</style>
