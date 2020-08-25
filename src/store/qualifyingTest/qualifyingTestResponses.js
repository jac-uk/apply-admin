import { firestore } from '@/firebase';
import { firestoreAction } from 'vuexfire';
import vuexfireSerialize from '@/helpers/vuexfireSerialize';
import tableQuery from '@/helpers/tableQuery';

const collectionRef = firestore.collection('qualifyingTestResponses');

export default {
  namespaced: true,
  actions: {
    bind: firestoreAction(({ bindFirestoreRef, state }, params ) => {

      const isSeachAdjustment = params.searchStatus === 'reasonable-adjustments';
      const isSearchStatus = params.searchStatus !== 'all' && !isSeachAdjustment && params.searchStatus !== '';

      let firestoreRef = collectionRef
        .where('qualifyingTest.id', '==', params.qualifyingTestId);

      if (isSearchStatus) {
        firestoreRef = firestoreRef
          .where('status', '==', params.searchStatus);
      }

      if (isSeachAdjustment) {
        firestoreRef = firestoreRef
          .where('candidate.reasonableAdjustments', '==', true);
      }

      firestoreRef = tableQuery(state.records, firestoreRef, params);

      return bindFirestoreRef('records', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbind: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('records');
    }),
    bindRecord: firestoreAction(({ bindFirestoreRef }, { id } ) => {

      // eslint-disable-next-line no-console
      // console.log('bind Qualifying test response', id);

      const firestoreRef = collectionRef.doc(id);

      return bindFirestoreRef('record', firestoreRef, { serialize: vuexfireSerialize });
    }),
    unbindRecord: firestoreAction(({ unbindFirestoreRef }) => {
      return unbindFirestoreRef('record');
    }), 
    updateRA: async (context, { data, id }) => {
      // Update Reasonable Adjustments
      const ref = collectionRef.doc(`${id}`);
      await ref.update(data);
    },
  },
  state: {
    records: [],
    record: null,
  },
};

