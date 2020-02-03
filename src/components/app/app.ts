import Vue from 'vue';
import AppHtml from './app.html';
import './app.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'vuex';
import { mapState } from 'vuex';

export const AppComponent = Vue.extend({
  name: 'AppComponent',
  template: AppHtml,
  data() {
    return {
      isLoggedIn: false as boolean,
      errors: [] as any[],
      fab: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      // FIXME: typescript error
      // @ts-ignore
      this.isLoggedIn = !!user;
    });
  },
  methods: {
    onScroll(e: any) {
      if (typeof window === 'undefined') {
        return;
      }
      const top = window.pageYOffset || e.target.scrollTop || 0;
      // FIXME: typescript error
      // @ts-ignore
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    logout() {
      try {
        firebase.auth().signOut();
        // FIXME: typescript error
        // @ts-ignore
        this.isLoggedIn = false;
        this.$router.push('/');
      } catch (error) {
        // FIXME: typescript error
        // @ts-ignore
        this.errors.push(`There was an error loging out: ${error.message}`);
      }
    },
  },
  computed: {
    appBarColor() {
      return this.$route.name === 'dashboard' ? 'primary' : 'transparent';
    },
    contentWrapper() {
      return this.$route.name === 'dashboard' ? true : false;
    },
    ...mapState(['data']),
  },
});
