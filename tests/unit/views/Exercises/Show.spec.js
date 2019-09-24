import Show from '@/views/Exercises/Show';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Navigation from '@/components/Page/Navigation';
import LoadingMessage from '@/components/LoadingMessage';

const localVue = createLocalVue();
localVue.use(Vuex);

const exercise = {
  name: 'test name',
};

const mockRoute = {
  name: 'name-of-current-route',
  params: {
    id: 'abc123',
  },
};

const mockRouter = {
  replace: jest.fn(),
};

const store = new Vuex.Store({
  dispatch: jest.fn(),
  modules: {
    exerciseDocument: {
      namespaced: true,
      actions: {
        bind: () => {
          new Promise((resolve) => {
            return resolve();
          });
        },
      },
      state: {
        record: exercise,
      },
    },
  },
});

const createTestSubject = () => {
  return shallowMount(Show, {
    store,
    localVue,
    mocks: {
      $route: mockRoute,
      $router: mockRouter,
    },
    stubs: {
      'RouterView': true,
    },
  });
};

describe('@/views/Exercises/Show', () => {
  describe('computed properties', () => {
    describe('exercise', () => {
      it('returns record object from state', () => {
        let wrapper = createTestSubject();
        expect(wrapper.vm.exercise).toEqual(exercise);
      });
    });
  });

  describe('template', () => {
    describe('when loaded is false', () => {
      it('renders LoadingMessage component', () => {
        let wrapper = createTestSubject();
        expect(wrapper.find(LoadingMessage).exists()).toBe(true);
      });

      it('does not render the RouterView', () => {
        let wrapper = createTestSubject();
        expect(wrapper.find('RouterView-stub').exists()).toBe(false);
      });
    });

    describe('when loaded is true', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = createTestSubject();
        wrapper.setData({ loaded: true });
      });

      it('does not render LoadingMessage component', () => {
        expect(wrapper.find({ ref: 'loadingMessageComponent' }).exists()).toBe(false);
      });

      it('renders the Navigation component', () => {
        expect(wrapper.find(Navigation).exists()).toBe(true);
      });

      it('renders the RouterView', () => {
        expect(wrapper.find('RouterView-stub').exists()).toBe(true);
      });
    });
  });

  describe('methods', () => {
    describe('redirectToErrorPage', () => {
      it('calls router replace method', () => {
        let wrapper = createTestSubject();
        wrapper.vm.redirectToErrorPage();
        expect(mockRouter.replace).toHaveBeenCalled();
      });
    });
  });
});
