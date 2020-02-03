import Vue from 'vue';
import ContactUsHtml from './contactUs.html';
import './contactUs.scss';
import emailjs from 'emailjs-com';

export const ContactUsComponent = Vue.extend({
  name: 'ContactUsComponent',
  template: ContactUsHtml,
  data() {
    return {
      nameRules: [(value: string) => !!value || 'Name is required.'],
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
      messageRules: [(value: string) => !!value || 'Message is required.'],
      formIsValid: false,
      success: false,
      error: false,
    };
  },
  methods: {
    sendEmail(e: { target: string | HTMLFormElement }) {
      emailjs
        .sendForm(
          'gmail',
          'template_GkKwfxYu',
          e.target,
          'user_wDhdvZKngf0M0zmdElzxc',
        )
        .then(
          () => {
            this.success = true;
          },
          () => {
            this.error = true;
          },
        );
    },
  },
});
