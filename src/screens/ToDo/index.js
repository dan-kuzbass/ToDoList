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
  Footer,
  Picker
} from "native-base";
import { connect } from "react-redux";
import { deleteTodoAction } from "../../actions/todos";
import { View, ToastAndroid } from "react-native";
import { Link } from "react-router-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ToDoCreator from "./Creator";
import ToDoEditor from "./Editor";

const Todos = props => {
  const [creatorModalVisible, setCreatorModalVisible] = useState(false);
  const [editorModalVisible, setEditorModalVisible] = useState(false);
  const colors = ["white", "green", "gray"];
  const [editableItem, setEditableItem] = useState({});
  const [filterKey, setFilterKey] = useState("2");
  const filter = value => {
    setFilterKey(value)
  }
  const renderListItems = () => {
    return props.todos.filter(item => {
      switch (filterKey) {
        case "0":
          return item.tasks == "0" || item.tasks == "1";
        case "1":
          return item.tasks == "2";
        default:
          return true
      }
    }).sort(function (a, b) {
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
            <Text style={{ textAlign: "center" }}>{todo.name}</Text>
          </Link>
        </View>
        <View style={{ flex: 1 }}>
          <Icon
            name="edit"
            size={25}
            onPress={() => { setEditorModalVisible(true); setEditableItem(todo) }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Icon
            name="delete"
            size={25}
            onPress={() => { props.deleteTodoAction(todo.id); ToastAndroid.show(`Список дел ${todo.name} удален!`, 3000) }}
            color="red"
          />
        </View>
      </ListItem>
    })
  }
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
        <View style={{ justifyContent: "center", alignItems: "center", borderBottomWidth: 1 }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 190, color: "black", borderWidth: 3 }}
            selectedValue={filterKey}
            onValueChange={filter}
          >
            <Picker.Item label="Неисполненные" value="0" />
            <Picker.Item label="Исполненные" value="1" />
            <Picker.Item label="Все" value="2" />
          </Picker>
        </View>
        <List style={{marginTop: 2}}>
          {renderListItems()}
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
  deleteTodoAction
})(Todos);