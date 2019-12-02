import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodoAction } from "../../../actions/todos";
import {
  Container,
  Button,
  Text,
  Header,
  Body,
  Title,
  Left,
  Footer
} from "native-base";
import { View, TextInput, Modal, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TodoListCreator = props => {
  const [newTodoListName, setNewTodoListName] = useState("");
  useEffect(() => {
    setNewTodoListName("");
  }, [props.todos]);
  const id = `f${(Math.floor(Math.random() * 1e8)).toString(16)}`;
  const addTodo = () => {
    const namesTodo = props.todos.map(todo => { return todo.name });
    if (namesTodo.includes(newTodoListName)) {
      ToastAndroid.show(`Список дел ${newTodoListName} уже существует!`, 3000)
    }
    else if (newTodoListName === "") {
      ToastAndroid.show("Пожалуйста, заполните поле название!", 3000)
    }
    else if (newTodoListName.length > 30) {
      ToastAndroid.show("В поле название должно быть не более 30 знаков!", 3000)
    }
    else {
      props.addTodoAction({ id, name: newTodoListName, tasks: 0 });
      props.setCreatorModalVisible(false);
      ToastAndroid.show(`Список дел ${newTodoListName} добавлен!`, 3000)
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.creatorModalVisible}
      onRequestClose={() => {props.setCreatorModalVisible(false)}}
    >
      <Container>
        <Header>
          <Left>
            <Icon
              name="clear"
              size={25}
              onPress={() => {
                props.setCreatorModalVisible(false);
              }}
            />
          </Left>
          <Body>
            <Title>Добавление списка дел</Title>
          </Body>
        </Header>
        <View style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text>Название</Text>
          <TextInput
            style={{ height: 40, width: 300, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => setNewTodoListName(text)}
            value={newTodoListName}
          />
        </View>
        <Footer style={{
          backgroundColor: "white"
        }}>
          <Button
            onPress={addTodo}
            style={{ justifyContent: "center" }}
          >
            <Text uppercase style={{ textAlign: "center" }}>Добавить список дел</Text>
          </Button>
        </Footer>
      </Container>
    </Modal>
  )
}

const mapStateToProps = state => ({
  todos: state.todos.todos
})

export default connect(mapStateToProps, {
  addTodoAction
})(TodoListCreator);