import { auth } from '@/firebase';

const module = {
  namespaced: true,
  state: {
    currentUser: null,
    authError: null,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setAuthError(state, message) {
      state.authError = message;
    },
  },
  actions: {
    setCurrentUser({ state, commit }, user) {
      if (user === null) {
        commit('setCurrentUser', null);
      } else {
        if (state.authError) { commit('setAuthError', null); }
        let allOk = false;
        if (user.emailVerified) {
          if (user.email.indexOf('@judicialappointments.digital') > 0) {
            allOk = true;
          }
          if (user.email.indexOf('@judicialappointments.gov.uk') > 0) {
            allOk = true;
          }  
        }
        if (allOk) {
          commit('setCurrentUser', {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
          });  
        } else {
          auth().signOut();
          commit('setAuthError', 'This site is restricted to employees of the Judicial Appointments Commission');
        }
      }
    },
  },
  getters: {
    isSignedIn(state) {
      return (state.currentUser !== null);
    },
  },
};

export default module;
