import { defineStore } from 'pinia';
import axios from 'axios';

export const blogStore = defineStore('blogStore', {
  state: () => {
    return {
      sampleBlogCards: [
        { blogTitle: 'Blog Card 1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021' },
        { blogTitle: 'Blog Card 2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021' },
        { blogTitle: 'Blog Card 3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021' },
        { blogTitle: 'Blog Card 4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021' },
      ],
      isEditable: null,
      user: null,
      profileEmail: null,
      profileFirstName: null,
      profileLastName: null,
      profileUserName: null,
      profileId: null,
      profileInitials: null,
      headers: null,
    };
  },
  actions: {
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
          { FirstName: this.profileFirstName, LastName: this.profileLastName, UserName: this.profileUserName,email: this.profileEmail },
          { headers: headers }
        )
        .then((res) => {
          this.profileInitials = this.profileFirstName[0] + this.profileLastName[0];
        });
    },
  },
});
