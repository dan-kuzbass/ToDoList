import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editTodoAction } from "../../../actions/todos";
import {
  Button,
  Text
} from "native-base";
import { View, TextInput, Modal, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
    console.log(namesTodo)
    if (namesTodo.includes(newTodoListName)) {
      ToastAndroid.show(`Список дел ${newTodoListName} уже существует!`, 3000)
    }
    else if (newTodoListName === "") {
      ToastAndroid.show(`Пожалуйста, заполните поле название!`, 3000)
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
    >
      <Icon
        name="clear"
        size={25}
        onPress={() => {
          props.setEditorModalVisible(false);
        }}
      />
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Text>Name</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setNewTodoListName(text)}
          value={newTodoListName}
        />
        <Button
          onPress={editTodo}
          style={{ marginTop: 30, justifyContent: "center" }}
        >
          <Text uppercase style={{ textAlign: "center" }}>Сохранить изменения</Text>
        </Button>
      </View>
    </Modal>
  )
}

const mapStateToProps = state => ({
  todos: state.todos.todos
})

export default connect(mapStateToProps, {
  editTodoAction
})(TodoListEditor);