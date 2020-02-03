import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {},
  state: {
    user: {
      uid: '',
    },
    data: {
      uid: 'nLhLw5rop8a1J41ekOTZoIh1GQx2',
      name: 'Bennys Pizzeria',
      location: {
        _lat: 53.821798,
        _long: -1.344509,
      },
      deliveries: [
        {
          dueBy: '16:30',
          item: 'BBQ Chicken',
          location: {
            _lat: 53.832769,
            _long: -1.342535,
          },
        },
        {
          dueBy: '16:43',
          item: 'Pepperoni',
          location: {
            _lat: 53.831237,
            _long: -1.392529,
          },
        },
        {
          dueBy: '16:50',
          item: 'Ham and Pinapple',
          location: {
            _lat: 53.827564,
            _long: -1.398513,
          },
        },
        {
          dueBy: '17:05',
          item: 'Pepperoni',
          location: {
            _lat: 53.826636,
            _long: -1.429481,
          },
        },
        {
          dueBy: '17:25',
          item: 'BBQ Chicken',
          location: {
            _lat: 53.807884,
            _long: -1.445675,
          },
        },
        {
          dueBy: '17:40',
          item: 'Pepperoni',
          location: {
            _lat: 53.792423,
            _long: -1.390792,
          },
        },
        {
          dueBy: '17:53',
          item: 'Margarita',
          location: {
            _lat: 53.815079,
            _long: -1.343997,
          },
        },
      ],
    },
    deliveries: null,
    selectedFinish: null,
  },
  actions: {
    getUserUid({ commit }, userUid) {
      commit('SET_USER_UID', userUid);
    },
    getDeliveries: ({ commit, dispatch }) => {
      dispatch('getUserUid', firebase.auth().currentUser!.uid);

      firebase
        .firestore()
        .collection('/deliveries')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              uid: doc.data().uid,
              name: doc.data().name,
              location: doc.data().location,
              deliveries: doc.data().deliveryDetails,
            };
            commit('SET_DATA', data);
          });
        });
    },
    setDeliveries({ commit }, deliveries) {
      commit('SET_DELIVERIES', deliveries);
    },
    setSelectedFinish({ commit }, location) {
      commit('SET_SELECTED_FINISH', location);
    },
  },
  mutations: {
    SET_USER_UID(state, userUid) {
      state.user.uid = userUid;
    },
    SET_DATA(state, data) {
      state.data = data;
    },
    SET_DELIVERIES(state, deliveries) {
      state.deliveries = deliveries;
    },
    SET_SELECTED_FINISH(state, location) {
      state.selectedFinish = location;
    },
  },
});

export default store;
