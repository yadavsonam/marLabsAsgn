import { createStore } from 'redux'
import rootReducer from '../src/reducer/rootReducer';

const store = createStore(rootReducer);
export default store;