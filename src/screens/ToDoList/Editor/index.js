import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editTaskAction } from "../../../actions/tasks";
import {
  Button,
  CheckBox,
  Text
} from "native-base";
import { View, TextInput, Modal, ToastAndroid} from "react-native";
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
      ToastAndroid.show(`Список дел ${newTaskName} уже существует!`, 3000)
    }
    else if (newTaskName === "") {
      ToastAndroid.show(`Пожалуйста, заполните поле название!`, 3000)
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
      ToastAndroid.show(`Список дел ${newTaskName} изменен!`, 3000)
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
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setNewTaskName(text)}
          value={newTaskName}
        />
        <Button
          onPress={editTask}
          style={{
            justifyContent: "center"
          }}
        >
          <Text uppercase>Сохранить измененное дело</Text>
        </Button>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <CheckBox checked={checked} color="green" onPress={() => { setChecked(!checked) }} />
          <Text>Срочное</Text>
        </View>
      </View>
    </Modal>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
})

export default connect(mapStateToProps, {
  editTaskAction
})(TodoListEditor);