import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // you can access that state from anywhere
//import { createStoreHook,applyMiddleware,compose } from 'react-redux'; // before written this modify to next line
import { legacy_createStore as createStore,applyMiddleware, compose} from 'redux'
//import { createStore,}  from 'redux';
import thunk from 'redux-thunk';

//import { Reducer } from './reducers';
import reducers from './reducers';
import "./index.css"
  


import App from './App';   

const store = createStore(reducers,compose(applyMiddleware(thunk)));


ReactDOM.render(
<Provider store={store}>
   <App /> {/* how our application is using redux now we can use it */}
</Provider>,
document.getElementById('root'));

  




