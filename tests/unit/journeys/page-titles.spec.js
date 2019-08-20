import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App';
import Router from 'vue-router';
import Vuex from 'vuex';

describe('Page titles', () => {
  let router;
  let store;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Router);
    localVue.use(Vuex);

    router = require('@/router').default;
    store = require('@/store').default;

    shallowMount(App, {
      localVue,
      router,
      store,
    });
  });

  const user = {
    uid: 'abc123',
    email: 'user@judicialappointments.digital',
  };

  describe('Sign In page', () => {

    beforeEach(() => {
      store.dispatch('setCurrentUser', null);
    });

    it('sets title as Sign In', () => {
      router.push('/sign-in');
      expect(document.title).toContain('Sign In');
    });

    it('contains Judicial Appointments Commission', () => {
      router.push('/sign-in');
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });

  describe('Dashboard Page', () => {

    beforeEach(() => {
      store.dispatch('setCurrentUser', user);
    });

    it('sets title as Dashboard', () => {
      router.push('/dashboard');
      expect(document.title).toContain('Dashboard');
    });

    it('contains Judicial Appointments Commission', () => {
      router.push('/dashboard');
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });

  describe('New Exercise Page', () => {

    beforeEach(() => {
      store.dispatch('setCurrentUser', user);
    });

    it('sets title as Create new exercise', () => {
      router.push('/exercise/new');
      expect(document.title).toContain('Create new exercise');
    });

    it('contains Judicial Appointments Commission', () => {
      router.push('/exercise/new');
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });

  describe('Name of Exercise', () => {

    beforeEach(() => {
      store.dispatch('setCurrentUser', user);
    });

    it('sets title as Name Of Exercise', () => {
      router.push('/exercise/new/name-of-exercise');
      expect(document.title).toContain('Name Of Exercise');
    });

    it('contains Judicial Appointments Commission', () => {
      router.push('/exercise/new/name-of-exercise');
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });

  describe('Type of Exercise', () => {

    beforeEach(() => {
      store.dispatch('setCurrentUser', user);
    });

    it('sets title as Type Of Exercise', () => {
      router.push('/exercise/new/type-of-exercise');
      expect(document.title).toContain('Type Of Exercise');
    });

    it('contains Judicial Appointments Commission', () => {
      router.push('/exercise/new/type-of-exercise');
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });

   describe('Number of Vacancies', () => {

    beforeEach(() => {
      store.dispatch('setCurrentUser', user);
    });

    it('sets title as Type Of Exercise', () => {
      router.push('/exercise/new/number-of-vacancies');
      expect(document.title).toContain('Number Of Vacancies');
    });

    it('contains Judicial Appointments Commission', () => {
      router.push('/exercise/new/number-of-vacancies');
      expect(document.title).toContain('Judicial Appointments Commission');
    });
  });

  describe('Eligibility', () => {

   beforeEach(() => {
     store.dispatch('setCurrentUser', user);
   });

   it('sets title as Eligibility', () => {
     router.push('/exercise/new/eligibility');
     expect(document.title).toContain('Eligibility');
   });

   it('contains Judicial Appointments Commission', () => {
     router.push('/exercise/new/eligibility');
     expect(document.title).toContain('Judicial Appointments Commission');
   });
  });

  describe('AboutTheRole', () => {

   beforeEach(() => {
     store.dispatch('setCurrentUser', user);
   });

   it('sets title as About The Role', () => {
     router.push('/exercise/new/about-the-role');
     expect(document.title).toContain('About The Role');
   });

   it('contains Judicial Appointments Commission', () => {
     router.push('/exercise/new/about-the-role');
     expect(document.title).toContain('Judicial Appointments Commission');
   });
 });



});
