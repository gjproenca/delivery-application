import Vue from 'vue';
import VueRouter from 'vue-router';
import { HomeComponent } from '@/components/home/home.ts';
import { ContactUsComponent } from '@/components/contactUs/contactUs';
import { DashboardComponent } from '@/components/dashboard/dashboard.ts';
import { LogInComponent } from '@/components/login/login.ts';
import { RegisterComponent } from '@/components/register/register.ts';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent,
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    component: ContactUsComponent,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardComponent,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LogInComponent,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
