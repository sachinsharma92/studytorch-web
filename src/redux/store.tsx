
import { createStore, applyMiddleware, compose } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import indexReducer from './reducers/indexReducer';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axiosInstance from "./../remote/axios";

const logger = createLogger();

/**
 * returns list of middlewares
 *
 * @return Array[]
 */
const configureMiddlewares = () => {

    const middlewares = [
        thunk.withExtraArgument({
        api: axiosInstance
        })];
    
    if (process.env.NODE_ENV === "development") {
        middlewares.push(logger); 
    }
    
    return middlewares;
};



const middlewares = compose(applyMiddleware(...configureMiddlewares()));
const store = createStore(indexReducer, middlewares);
const persistor = persistStore(store);

const storeWithPersistor = {
    store,
    persistor
};

export default storeWithPersistor;