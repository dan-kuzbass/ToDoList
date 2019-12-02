import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editTaskAction } from "../../../actions/tasks";
import {
  Container,
  Button,
  Text,
  Header,
  Body,
  Title,
  Left,
  Footer,
  CheckBox
} from "native-base";
import { View, TextInput, Modal, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TodoListEditor = props => {
  const [newTaskName, setNewTaskName] = useState("");
  const [checked, setChecked] = useState(false);
  useEffect(
    () => {
      setNewTaskName(props.task.name);
    },
    [props.task.name],
  );
  useEffect(
    () => {
      setChecked(props.task.immediate);
    },
    [props.task.immediate],
  );
  const editTask = () => {
    const namesTask = props.tasks.map(task => { return task.name }).filter(name => name !== props.task.name);
    if (namesTask.includes(newTaskName)) {
      ToastAndroid.show(`Дело ${newTaskName} уже существует!`, 3000)
    }
    else if (newTaskName === "") {
      ToastAndroid.show("Пожалуйста, заполните поле название!", 3000)
    }
    else if (newTaskName.length > 30) {
      ToastAndroid.show("В поле название должно быть не более 30 знаков!", 3000)
    }
    else {
      props.editTaskAction({
        id: props.task.id,
        name: newTaskName,
        listID: props.task.listID,
        created_time: props.task.created_time,
        immediate: checked,
        done: props.task.done
      });
      props.setEditorModalVisible(false);
      ToastAndroid.show(`Дело ${newTaskName} изменено!`, 3000)
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.editorModalVisible}
      onRequestClose={() => {props.setEditorModalVisible(false)}}
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
            onChangeText={text => setNewTaskName(text)}
            value={newTaskName}
          />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text>Срочное?</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <CheckBox checked={checked} color="green" onPress={() => { setChecked(!checked) }} />
            </View>
          </View>
        </View>
        <Footer style={{backgroundColor: "white"}}>
          <Button
            onPress={editTask}
            style={{
              justifyContent: "center"
            }}
          >
            <Text uppercase>Сохранить измененное дело</Text>
          </Button>
        </Footer>
      </Container>
    </Modal>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
})

export default connect(mapStateToProps, {
  editTaskAction
})(TodoListEditor);