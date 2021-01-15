import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, AppRegistry, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class App extends React.Component {

  async createClient(){
    try {

      await fetch('https://quiet-plains-74500.herokuapp.com/createclient', {
        method: 'post',
        mode:'no-cors',
        headers: {
          'Accept': 'aplication/json',
          'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({
          name: this.state(name),
          lastName: this.state(lastName),
          birthdate:this.state(birthdate)
        })
      })
    } catch(e){
      console.log(e);
    }
  }

  constructor(){
    super()
    this.state = {
      name: "",
      lastName: "",
      birthdate: "1996-07-08",
    }
  }
  calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  changeName(name){
    this.setState({name})
  }
  changeLastName(lastName){
    this.setState({lastName})
  }
  buttonPressed(){
    if(this.state.name && this.state.birthdate){
      Alert.alert('Successful Register')
    } else {
      Alert.alert('Error!!')
    }
  }
  render() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Register in API</Text>
        <TextInput 
          style={styles.input}
          placeholder="Enter your name"
          value={this.state.name}
          onChangeText={(name)=>this.changeName(name)}
        />
        <TextInput 
          style={styles.input}
          placeholder="Enter your last name"
          value={this.state.lastName}
          onChangeText={(lastName)=>this.changeLastName(lastName)}
        />
        <DatePicker
          style={styles.input}
          date={this.state.birthdate}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1950-01-01"
          maxDate="2013-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderColor: 'transparent',
          }
        }}
          onDateChange={(date) => {this.setState({birthdate: date})}}
      />
        <TouchableHighlight 
        style={styles.button}
        onPress={()=> this.buttonPressed()}
        >
          <Text style={styles.textButton}>Save!</Text>
        </TouchableHighlight>
      </View>
      <StatusBar style="auto" />
    </View>
  );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8edeb',
    color: '#0a1128',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 8,
  },
  input: {
    height:40,
    borderBottomColor: '#fae1dd',
    borderBottomWidth: 2,
    backgroundColor: 'transparent',
    marginBottom:20,
  },
  button:{
    backgroundColor:'#c9ada7',
    paddingTop:15,
    paddingBottom:15
  },
  textButton:{
    textAlign: 'center',
    color:'#22223b'
  },
});

AppRegistry.registerComponent('appReact', () => appReact);
