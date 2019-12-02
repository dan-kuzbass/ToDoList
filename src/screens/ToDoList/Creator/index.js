import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTaskAction } from "../../../actions/tasks";
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

const TodoListCreator = props => {
  const getCurrentTime = () => {
    let date = new Date();
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;
    let yy = date.getFullYear();
    let hh = date.getHours();
    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;
    return `${dd}.${mm}.${yy} ${hh}:${mins}`;
  };
  const [newTaskName, setNewTaskName] = useState("");
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setNewTaskName("");
    setChecked(false);
  }, [props.tasks]);
  const id = `f${(Math.floor(Math.random() * 1e8)).toString(16)}`;
  const addTask = () => {
    const namesTask = props.tasks.map(task => { return task.name });
    if (namesTask.includes(newTaskName)) {
      ToastAndroid.show(`Список дел ${newTaskName} уже существует!`, 3000)
    }
    else if (newTaskName === "") {
      ToastAndroid.show("Пожалуйста, заполните поле название!", 3000)
    }
    else if (newTaskName.length > 30) {
      ToastAndroid.show("В поле название должно быть не более 30 знаков!", 3000)
    }
    else {
      props.addTaskAction({
        id,
        name: newTaskName,
        listID: props.listID,
        created_time: getCurrentTime(),
        immediate: checked,
        done: false
      });
      props.setCreatorModalVisible(false);
      ToastAndroid.show(`Дело ${newTaskName} добавлено!`, 3000)
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
            <Title>Добавление дела</Title>
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
      </Container>
      <Footer style={{ backgroundColor: "white" }}>
        <Button
          onPress={addTask}
          style={{
            justifyContent: "center"
          }}
        >
          <Text uppercase>Добавить дело</Text>
        </Button>
      </Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
})

export default connect(mapStateToProps, {
  addTaskAction
})(TodoListCreator);