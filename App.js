import React from 'react';
import {View, Button, Text, ScrollView, StyleSheet, Switch,Alert , TextInput,TouchableOpacity} from 'react-native'
import { CheckBox,Card } from 'react-native-elements'
import Constants from 'expo-constants'
import DatePicker from "react-native-datepicker";


let id = 0
 


const Todo = props => (
  <View style={styles.todoContainer}>
    <CheckBox checked={props.todo.checked} onPress={props.onTodoClick}  />
    <Text style={{fontSize:20,fontWeight:'300',color:'white'}}>{props.todo.text}</Text>
    <Text style = {{color:'white'}}> {props.todo.dueDate} </Text>
    <TouchableOpacity style={[styles.button]} onPress={props.onDelete}>
       <Text style={[styles.buttontext],[styles.removebutton]}>Remove</Text>
    </TouchableOpacity>

  </View>
)

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      text: '',
      dueDate:"",
    }
  }

  addTodo(text, date) {
    id++
    this.setState({
      todos: [
        ...this.state.todos,
        {id: id, text: text, checked: false, dueDate:date},
      ],
      text: '',
    })
  }

  takeInput = (input) => {
      this.setState({ text: input })
  }

  dateChange = (date) => {
    this.setState({ dueDate: date });
  };

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
      <Text style={[styles.heading]}>Todo List</Text>
      
        <TextInput
          style={[styles.input]}
          placeholder = "Enter your task..."
          placeholderTextColor = "grey"
          onChangeText={this.takeInput}
          value={this.state.text}
        />
        <View style={[styles.appdate]}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.dueDate}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2020"
            maxDate="01-01-2100"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={this.dateChange}
          />
          <TouchableOpacity
            style={[styles.addbutton, styles]}
            onPress={() => this.addTodo(this.state.text, this.state.dueDate)}
          >
            <Text style={[styles.buttontext]}>ADD</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {this.state.todos.map(todo => (
            // <Card style={styles.card}>
            <Todo
              onTodoClick={() => this.toggleTodo(todo.id)}
              todo={todo}
              onDelete={() => this.removeTodo(todo.id)}
            />
            // </Card>
          ))}

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:10,

  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },
  fill: {
    flex: 1,
    backgroundColor:'#393e46',
    
  },

  addbutton:{
    display: 'flex',
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginLeft:'auto',
    marginRight:'auto',

    backgroundColor: '#00adb5',
    shadowOpacity: 0.2,
    shadowOffset: { height: 5, width: 0 },
    shadowRadius: 20,
 
  },
  button:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    marginRight:'auto',

  },
  heading:{
    paddingLeft:10,
    alignItems: 'center',
    fontSize:30,
    fontWeight:'300',
    color:'white',
  },
  input:{
    borderRadius:30,
    height: 45, 
    borderWidth: 2, 
    margin: 15, 
    borderColor: 'gray', 
    paddingLeft:10,
    fontWeight:"300",
    fontSize:20,
    color:'white'
  },
  buttontext:{
    fontWeight:'300',
    fontSize:18,
    color:'white',
    textTransform: 'lowercase'
  },
  removebutton:{
    color:'red',
    fontSize:18,
    textTransform: 'lowercase',
    fontWeight:'bold',
  },
  appdate: {

    flexDirection: 'row',

  }
})
