import { defineStore } from 'pinia';
import firebase from 'firebase/compat/app';
import db from '../firebase/firebase';

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
    };
  },
  actions: {
    isEditableAction(payload) {
      this.isEditable = payload;
    },
    async getCurrenctUser() {
      const user = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResults = await user.get();
      this.profileId = dbResults.id;
      this.profileEmail = dbResults.data().email;
      this.profileUserName = dbResults.data().username;
      this.profileFirstName = await dbResults.data().firstname;
      this.profileLastName = await dbResults.data().lastname;
      this.profileInitials = this.profileFirstName[0] + this.profileLastName[0];
    },
    updateUser(payload) {
      this.user = payload;
    },
    async updateProfile() {
      const dataBase = await db.collection('users').doc(this.profileId);
      dataBase.update({
        firstname: this.profileFirstName,
        lastname: this.profileLastName,
        username: this.profileUserName,
      });
      this.profileInitials = this.profileFirstName[0] + this.profileLastName[0];
    },
  },
});
