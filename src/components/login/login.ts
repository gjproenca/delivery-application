import Vue from 'vue';
import LoginHtml from './login.html';
import './login.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const LogInComponent = Vue.extend({
  name: 'LogInComponent',
  template: LoginHtml,
  data() {
    return {
      errors: [] as any[],
      showPassword: false,
      password: '' as any,
      passwordRules: [
        (value: string) => !!value || 'You must fill in your Password.',
      ],
      email: '' as any,
      emailRules: [
        (value: string) => !!value || 'Email is required.',
        (value: string) =>
          value.indexOf('@') !== 0 || 'Email should have a username.',
        (value: string) =>
          value.includes('@') || 'Email should include an @ symbol.',
        (value: string) =>
          value.indexOf('.') - value.indexOf('@') > 1 ||
          'Value should contain a valid domain.',
        (value: string) =>
          value.indexOf('.') <= value.length - 3 ||
          'Email should contain a valid domain extension.',
      ],
      formIsValid: false,
    };
  },
  methods: {
    login() {
      try {
        firebase
          .auth()
          // @ts-ignore
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            // @ts-ignore
            this.$router.push('/dashboard');
          });
      } catch (error) {
        // @ts-ignore
        this.errors.push(`There was an error logging in: ${error.message}`);
      }
    },
  },
});
