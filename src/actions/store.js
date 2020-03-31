import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//import reducers from "../reducers";
//import { ApolloProvider, compose } from 'react-apollo';

//CONFIGURE REDUX STORE

export const store = createStore(
    {},
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)