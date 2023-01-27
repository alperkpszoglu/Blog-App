<template>
  <div class="home">
    <BlogPost :post="heroSection" />
    <BlogPost v-for="(post, index) in sampleBlogPost" :key="index" :post="post" />
    <div class="blog-card-wrapper">
      <div class="container">
        <h3>Daha Fazla Blog Görüntüle</h3>
        <div class="blog-cards">
          <BlogCard :key="index" v-for="(post, index) in sampleBlogCards" :post="post" />
        </div>
      </div>
    </div>

    <div class="updates">
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
      sampleBlogCards: [
        { blogTitle: 'Blog Card 1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021' },
        { blogTitle: 'Blog Card 2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021' },
        { blogTitle: 'Blog Card 3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021' },
        { blogTitle: 'Blog Card 4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021' },
      ],
    };
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
  h3 {
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }
}
</style>
