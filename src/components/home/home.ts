import Vue from 'vue';
import HomeHtml from './home.html';
import './home.scss';

export const HomeComponent = Vue.extend({
  name: 'HomeComponent',
  template: HomeHtml,
});
