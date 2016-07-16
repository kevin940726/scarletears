import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import App from './components/App';
import createReducer from './reducers';

const injectReducer = store => (name, asyncReducer, action) => {
	if (!store.asyncReducers[name]) {
		store.asyncReducers[name] = asyncReducer;
		store.replaceReducer(createReducer(store.asyncReducers));
		if (action && typeof action === 'function') {
			store.dispatch(action());
		}
	}
};

const createRoutes = store => ({
	path: '/',
	component: App,
	indexRoute: {
		getComponent: (nextState, cb) => require.ensure([], require =>
			cb(null, require('./components/Home').default)),
	},
	childRoutes: [],
});

const Routes = ({ store, history }) => (
	<Provider store={store}>
		<Router history={history} routes={createRoutes(store)} />
	</Provider>
);

export default Routes;
