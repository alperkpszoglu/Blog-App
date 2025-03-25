import { defineStore } from 'pinia';
import axios from 'axios';

export const blogStore = defineStore('blogStore', {
  state: () => {
    return {
      blogs: [],
      isEditable: null,
      user: null,
      profileEmail: null,
      profileFirstName: null,
      profileLastName: null,
      profileUserName: null,
      profileIsAdmin: null,
      profileCreatedDate: null,
      profileInitials: null,
      headers: null,

      // create post
      blogHTML: 'Blog basligini buraya yaz',
      blogTitle: '',
      blogPhotoName: null,
      blogPhotoFileURL: null,
      blogPhotoPreview: null,
    };
  },
  getters: {
    sampleBlogPosts() {
      return this.blogs.slice(0, 2);
    },
    blogCardFeeds() {
      return this.blogs.slice(2, 6);
    },
  },
  actions: {
    getAllBlogs() {
      axios.get(import.meta.env.VITE_BASE_URL + '/api/Blog/GetAllBlogs').then((res) => {
        this.blogs = res.data;
      });
    },
    isEditableAction(payload) {
      this.isEditable = payload;
    },
    getToken() {
      const token = localStorage.getItem('token');

      return {
        Authorization: `Bearer ${token}`,
      };
    },
    async getCurrentUser() {
      const headers = this.getToken();
      await axios
        .get(import.meta.env.VITE_BASE_URL + '/api/User/GetCurrentUser', { headers: headers })
        .then((res) => {
          this.profileEmail = res.data.email;
          this.profileUserName = res.data.userName;
          this.profileFirstName = res.data.firstName;
          this.profileLastName = res.data.lastName;
          this.profileIsAdmin = res.data.isAdmin;
          this.profileCreatedDate = res.data.createdDate;
          this.user = res.data;
          this.profileInitials = this.profileFirstName[0] + this.profileLastName[0];
        })
        .catch(() => {
          console.log('giris yapilmali');
        });
    },
    updateProfile() {
      const headers = this.getToken();
      axios
        .post(
          import.meta.env.VITE_BASE_URL + '/api/User/UpdateUser',
          {
            FirstName: this.profileFirstName,
            LastName: this.profileLastName,
            UserName: this.profileUserName,
            email: this.profileEmail,
          },
          { headers: headers }
        )
        .then(() => {
          this.profileInitials = this.profileFirstName[0] + this.profileLastName[0];
        });
    },
    newBlogPost(payload) {
      this.blogHTML = payload;
    },
    updateBlogTitle(payload) {
      this.blogTitle = payload;
    },
    RemoveBlog(payload) {
      // for delete the blog
      const headers = this.getToken();

      axios.get(import.meta.env.VITE_BASE_URL +`/api/Blog/RemoveBlog?blogId=${payload}`, { headers: headers }).then(() => {
        this.getAllBlogs();
      });
    },
    setBlogState(payload) {
      // for edit the blog
      console.log(payload);
      this.blogTitle = payload.blogTitle;
      this.blogHTML = payload.blogHTML;
      this.blogPhotoName = payload.blogPhotoName;
      this.blogPhotoFileURL = payload.blogPhotoFileURL;
    },
  },
});
