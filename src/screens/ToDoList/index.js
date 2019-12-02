import React, { useState, useEffect } from "react";
import { Link } from "react-router-native";
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
  CheckBox
} from "native-base";
import { View, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ToDoListCreator from "./Creator";
import ToDoListEditor from "./Editor";
import { connect } from "react-redux";
import { deleteTaskAction } from "../../actions/tasks";
import { editTaskAction } from "../../actions/tasks";

const TodoList = props => {
  const [creatorModalVisible, setCreatorModalVisible] = useState(false);
  const [editorModalVisible, setEditorModalVisible] = useState(false);
  const [editableItem, setEditableItem] = useState({});
  const setChoose = async (task) => {
    props.editTaskAction({
      id: task.id,
      name: task.name,
      listID: task.listID,
      created_time: task.created_time,
      immediate: task.immediate,
      done: !task.done
    });
  }
  const renderListItems = () => {
    {
      return props.tasks.filter(task => task.listID === props.match.params.id).sort((a, b) => {
        if (a.created_time > b.created_time) {
          return -1;
        }
        if (a.created_time < b.created_time) {
          return 1;
        }
        return 0;
      }).map((task, index) => {
        return <ListItem key={index} noIndent style={task.immediate ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>
          <View style={{ flex: 1 }}>
            <CheckBox
              checked={task.done} color="green"
              onPress={() => { setChoose(task) }} />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={{textAlign: "center"}}>{task.name}</Text>
          </View>
          <View style={{ flex: 4 }}>
            <Text>{task.created_time}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Icon
              name="edit"
              size={25}
              onPress={() => { setEditorModalVisible(true); setEditableItem(task) }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Icon
              name="delete"
              size={25}
              onPress={() => { props.deleteTaskAction(task.id); ToastAndroid.show(`Дело ${task.name} удалено!`, 3000) }}
              color="red"
            />
          </View>
        </ListItem >
      })
    }
  }
  return (
    <Container>
      <Header>
        <Left>
          <Link to="/">
            <Icon
              name="arrow-back"
              size={25}
            />
          </Link>
        </Left>
        <Body>
          <Title>{`${props.match.params.name}`}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {renderListItems()}
        </List>
        <ToDoListCreator
          creatorModalVisible={creatorModalVisible}
          listID={props.match.params.id.toString()}
          setCreatorModalVisible={setCreatorModalVisible}
        />
        <ToDoListEditor
          editorModalVisible={editorModalVisible}
          setEditorModalVisible={setEditorModalVisible}
          task={editableItem}
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
          }}
        >
          <Text uppercase>Добавить дело</Text>
        </Button>
      </Footer>
    </Container>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
})

export default connect(mapStateToProps, {
  editTaskAction,
  deleteTaskAction
})(TodoList);