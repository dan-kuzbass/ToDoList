import React, { useState } from "react";
import {
  Container,
  Button,
  Content,
  List,
  ListItem,
  Text,
  Header,
  Body,
  Title,
  Left,
  Right,
  Footer
} from "native-base";
import { connect } from "react-redux";
import { addTodoAction, deleteTodoAction } from "../../actions/todos";
import { View } from "react-native";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ToDoCreator from "./Creator";
import ToDoEditor from "./Editor";

const Todos = props => {
  const [creatorModalVisible, setCreatorModalVisible] = useState(false);
  const [editorModalVisible, setEditorModalVisible] = useState(false);
  const colors = ["white", "green", "gray"];
  const [editableItem, setEditableItem] = useState({});
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Списки дел</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {props.todos.sort(function (a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
            if (nameA < nameB)
              return -1
            if (nameA > nameB)
              return 1
            return 0 
          }).map((todo, index) => {
            return <ListItem key={index} noIndent style={{ backgroundColor: `${colors[todo.tasks]}` }}>
              <View style={{ flex: 5 }}>
                <Link to={`/tasks/${todo.id}/${todo.name}`}>
                  <Text>{todo.name}</Text>
                </Link>
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Icon
                  name="edit"
                  size={25}
                  onPress={() => { setEditorModalVisible(true); setEditableItem(todo) }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Icon
                  name="delete"
                  size={25}
                  onPress={() => { props.deleteTodoAction(todo.id) }}
                  color="red"
                />
              </View>
            </ListItem>
          })}
        </List>
        <ToDoCreator
          creatorModalVisible={creatorModalVisible}
          setCreatorModalVisible={setCreatorModalVisible}
        />
        <ToDoEditor
          editorModalVisible={editorModalVisible}
          setEditorModalVisible={setEditorModalVisible}
          todo={editableItem}
        />
      </Content>
      <Footer
        style={{
          backgroundColor: "white"
        }}
      >
        <Button
          onPress={() => { setCreatorModalVisible(true) }}
          style={{
            justifyContent: "center"
          }}>
          <Text uppercase>Добавить список дел</Text>
        </Button>
      </Footer>
    </Container>
  )
}

const mapStateToProps = state => ({
  todos: state.todos.todos
})

export default connect(mapStateToProps, {
  addTodoAction,
  deleteTodoAction
})(Todos);