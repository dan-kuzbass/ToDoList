import React, { useState } from "react";
import { Link } from "react-router-native";
import { connect } from "react-redux";
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
  Right
} from "native-base";
import { View, TextInput, Modal } from "react-native";
import { addTaskAction } from "../actions/tasks";
import Icon from "react-native-vector-icons/MaterialIcons";

const TodoList = props => {
  //.filter(task => task.listID === props.match.params.id)
  const [newTaskName, setNewTaskName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const getCurrentTime = () => {
    let date = new Date();
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    let yy = date.getFullYear();
    let hh = date.getHours();
    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;
    return `${dd}.${mm}.${yy} ${hh}:${mins}`;
  };
  return (
    <Container>
      <Header>
        <Left>
          <Link to="/">
            <Icon
              name="arrow-back"
              size={25}
              // onPress={() => { }}
            />
          </Link>
        </Left>
        <Body>
          <Title>Список дел</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {props.tasks.filter(task => task.listID === props.match.params.id).sort((a, b) => {
            if (a.created_time > b.created_time) {
              return -1;
            }
            if (a.created_time < b.created_time) {
              return 1;
            }
            // a должно быть равным b
            return 0;
          }).map((task, index) => {
            return <ListItem key={index} noIndent style={task.done ? { backgroundColor: "green" } : { backgroundColor: "white" }}>
              <View style={{ flex: 3 }}>
                <Text>{task.name}</Text>
              </View>
              <View style={{ flex: 4 }}>
                <Text>{task.created_time}</Text>
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
                  color="red"
                />
              </View>
            </ListItem>
          })}
        </List>
        <Button
          onPress={() => { setModalVisible(true) }}
          textStyle={{ textAlignVertical: "center", textAlign: "center" }}>
          <Text>Добавить дело</Text>
        </Button>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
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
              onPress={() => {
                props.addTaskAction({
                  id: "4",
                  name: newTaskName,
                  listID: props.match.params.id.toString(),
                  created_time: getCurrentTime(),
                  done: false
                });
                setModalVisible(false);
              }}
            >
              <Text>Добавить дело</Text>
            </Button>
          </View>
        </Modal>
      </Content>
    </Container>
  )
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks
})

export default connect(mapStateToProps, {
  addTaskAction
})(TodoList);