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
      axios.get('https://localhost:7139/api/Blog/GetAllBlogs').then((res) => {
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
    getCurrenctUser() {
      const headers = this.getToken();
      axios
        .get('https://localhost:7139/api/User/GetCurrentUser', { headers: headers })
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
          'https://localhost:7139/api/User/UpdateUser',
          {
            FirstName: this.profileFirstName,
            LastName: this.profileLastName,
            UserName: this.profileUserName,
            email: this.profileEmail,
          },
          { headers: headers }
        )
        .then((res) => {
          this.profileInitials = this.profileFirstName[0] + this.profileLastName[0];
        });
    },
    newBlogPost(payload) {
      this.blogHTML = payload;
    },
    updateBlogTitle(payload) {
      this.blogTitle = payload;
    },
  },
});
