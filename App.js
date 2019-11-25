import React from 'react';
import TodoList from './src/screens/TodoList';
import Todos from "./src/screens/Todos";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers/index';
import thunk from 'redux-thunk';
import { NativeRouter, Route } from "react-router-native";
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right
} from 'native-base';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
        <NativeRouter>
          <Route exact path="/" component={Todos} />
          <Route path="/tasks/:id" component={TodoList} />
        </NativeRouter>
    </Provider>
  );
};

export default App;
