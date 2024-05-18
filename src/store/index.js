import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './reducers/contact';

const reducers = {
	reducer: {
        contact: contactReducer
	}
};

const store = configureStore(reducers, applyMiddleware(thunk));

export default store;
