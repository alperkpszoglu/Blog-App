<template>
  <div class="home">
    <BlogPost v-if="!user" :post="heroSection" />
    <BlogPost v-for="(post, index) in sampleBlogPost" :key="index" :post="post" />
    <div class="blog-card-wrapper">
      <div class="container">
        <h3>Daha Fazla Blog Görüntüle</h3>
        <div class="blog-cards">
          <BlogCard :key="index" v-for="(post, index) in sampleBlogCards" :post="post" />
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#"> Register for FireBlogs <ArrowIcon class="arrow arrow-light" /> </router-link>
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
        title: 'Welcome',
        blogPost:
          'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
        heroSection: true,
        photo: 'coding',
      },
      sampleBlogPost: [
        {
          title: 'this is a title',
          blogHTML: 'this is a blog post title!',
          blogCoverPhoto: 'beautiful-stories',
        },
        {
          title: 'this is a second title',
          blogHTML: 'this is a blog post title!',
          blogCoverPhoto: 'designed-for-everyone',
        },
      ],
    };
  },
  computed: {
    sampleBlogCards() {
      return blogStore().sampleBlogCards;
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
