import React from 'react';
import TodoList from './src/screens/TodoList';
import Todos from "./src/screens/Todos";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers/index';
import thunk from 'redux-thunk';
import { NativeRouter, Route, Link } from "react-router-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  Body,
  Title,
  Left,
  Right
} from 'native-base';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Ежедневник</Title>
          </Body>
          <Right />
        </Header>
        <NativeRouter>
          <Route exact path="/" component={Todos} />
          <Route path="/tasks/:id" component={TodoList} />
        </NativeRouter>
      </Container>
    </Provider>
  );
};

export default App;
