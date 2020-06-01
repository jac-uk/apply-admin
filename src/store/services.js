import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef }) => {
      const firestoreRef = firestore.doc('settings/services');
      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }),
    notificationsStart() {
      return firestore.doc('settings/services').update({
        'notifications.isProcessing': true,
      });
    },
    notificationsStop() {
      return firestore.doc('settings/services').update({
        'notifications.isProcessing': false,
      });
    },
  },
  state: {
    record: null,
  },
};