import React, { useState, useEffect } from "react";
import { Container, Button, Content, List, ListItem, Text } from "native-base";
import { connect } from "react-redux";
import { addTodoAction } from "../actions/todos";
import { View, TextInput, Modal, Dimensions } from "react-native";
import { Link } from "react-router-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";


const Todos = props => {
  const [newTodoListName, setNewTodoListName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const getColor = id => {
    props.tasks.filter(item => item.id === id)
  };
  const { width } = Dimensions.get('window');
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/dan-kuzbass/ToDoList/todos')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  });
  return (
    <Container>
      <Content>
        <List>
          {props.todos.map((todo, index) => {
            return <ListItem key={index} noIndent style={todo.done ? { backgroundColor: "green" } : { backgroundColor: "white" }}>
              <View style={{ flex: 5 }}>
                <Link to={`/tasks/${index + 1}`}>
                  <Text>{todo.name}</Text>
                </Link>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Icon
                  name="edit"
                  size={25}
                  onPress={() => { }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Icon
                  name="delete"
                  size={25}
                  onPress={() => { }}
                />
              </View>
            </ListItem>
          })}
        </List>
        <Button
          onPress={() => { setModalVisible(true) }}
          textStyle={{ textAlignVertical: "center", textAlign: "center" }}>
          <Text>Добавить список дел</Text>
        </Button>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            width: width * 0.7
          }}>
            <Text>Name</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={text => setNewTodoListName(text)}
              value={newTodoListName}
            />
            <Button
              onPress={() => {
                props.addTodoAction({ id: "4", name: newTodoListName, done: false });
                setModalVisible(false);
              }}
              style={{ marginTop: 30 }}
            >
              <Text style={{ align: "center" }}>Добавить список дел</Text>
            </Button>
          </View>
        </Modal>
      </Content>
    </Container>
  )
}

const mapStateToProps = state => ({
  todos: state.todos.todos,
  tasks: state.tasks.tasks
})

export default connect(mapStateToProps, {
  addTodoAction
})(Todos);