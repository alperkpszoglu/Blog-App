<template>
  <div class="home">
    <BlogPost :post="heroSection" />
    <BlogPost v-for="(post, index) in sampleBlogPost" :key="index" :post="post" />
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
export default {
  components: {
    BlogPost,
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
};
</script>
