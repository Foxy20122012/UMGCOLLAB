const { createStore } = require('react-simple-hook-store');

const store = createStore({
  env: {
    token: '',
    user: {},
    constante: {},
    redirectPath: '',
  },
});

const setEnv = (newState) => {
  store.setState({
    env: {
      ...store.state.env,
      ...newState,
    },
  });
};

module.exports = { useStore: store.useStore, store, setEnv };