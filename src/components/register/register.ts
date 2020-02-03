import Vue from 'vue';
import RegisterHtml from './register.html';
import './register.scss';
import firebase from 'firebase/app';
import 'firebase/auth';

export const RegisterComponent = Vue.extend({
  name: 'RegisterComponent',
  template: RegisterHtml,
  data() {
    return {
      errors: [] as any[],
      showPassword: false,
      agreeToTermsRules: [
        (value: boolean) =>
          !!value ||
          'You must agree to the terms and conditions to sign up for an account.',
      ],
      agreeToTerms: false,
      password: '',
      passwordRules: [
        (value: string) => !!value || 'You must fill in your Password.',
      ],
      email: '',
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
    async register() {
      try {
        await firebase
          .auth()
          // @ts-ignore
          .createUserWithEmailAndPassword(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        this.errors.push(
          `There was an error creating the account: ${error.message}`,
        );
      }
    },
  },
});
