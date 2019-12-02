import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editTodoAction } from "../../../actions/todos";
import { View, TextInput, Modal, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
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

const TodoListEditor = props => {
  const [newTodoListName, setNewTodoListName] = useState("");
  useEffect(
    () => {
      setNewTodoListName(props.todo.name);
    },
    [props.todo.name],
  );

  const editTodo = () => {
    const namesTodo = props.todos.map(todo => { return todo.name }).filter(name => name !== props.todo.name);
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
      props.editTodoAction({ id: props.todo.id, name: newTodoListName, tasks: props.todo.tasks });
      props.setEditorModalVisible(false);
      ToastAndroid.show(`Список дел ${newTodoListName} изменен!`, 3000)
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.editorModalVisible}
      onRequestClose={() => { props.setEditorModalVisible(false) }}
    >
      <Container>
        <Header>
          <Left>
            <Icon
              name="clear"
              size={25}
              onPress={() => {
                props.setEditorModalVisible(false);
              }}
            />
          </Left>
          <Body>
            <Title>Редактирование</Title>
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
            style={{ height: 40, width: 300, borderColor: "gray", marginTop: 5, borderWidth: 1 }}
            onChangeText={text => setNewTodoListName(text)}
            value={newTodoListName}
          />
        </View>
        <Footer style={{backgroundColor: "white"}}>
          <Button
            onPress={editTodo}
            style={{ justifyContent: "center" }}
          >
            <Text uppercase style={{ textAlign: "center" }}>Сохранить изменения</Text>
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
  editTodoAction
})(TodoListEditor);