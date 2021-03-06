import "../css/Quiz.css";
import { Button, FormGroup, FormControl, FormText, FormCheck } from "react-bootstrap";
import { FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import {Radio, RadioGroup} from 'react-radio-group';
import {Component} from 'react';
import { withRouter } from "react-router-dom";


export default class Quiz extends Component{
  constructor (props){
  super(props);
  this.onChangeEmail = this.onChangeEmail.bind(this);
  this.onChangeName = this.onChangeName.bind(this);
  this.onChangeAge = this.onChangeAge.bind(this);
  this.onChangeWeight = this.onChangeWeight.bind(this);
  this.onChangeHeight = this.onChangeHeight.bind(this);
  this.onChangeGender = this.onChangeGender.bind(this);
  this.onChangeExperience = this.onChangeExperience.bind(this);
  this.onChangeTrainingHours = this.onChangeTrainingHours.bind(this);
  this.onChangeStyle= this.onChangeStyle.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.state ={
        email: '',
        name: '',
        age: 0,
        weight: 0,
        height: 0,
        gender: '',
        experience: 0,
        trainingHours: 0,
        style: ''
      };
     
  }
  componentDidMount(){
    console.log('inside componentDidMount')
    const user = {
      email:window.$Email
    }
    console.log('email=' + user.email)
    axios.get('/users/quiz', user)
    .then(res => {
      console.log('inside .then')
      let i
      let loop = res.data.length
      let okEmail = false
      for (i=0; (i <loop); i++){
        if(res.data[i].email === user.email){
          this.setState({
            email:res.data[i].email,
            name: res.data[i].name,
            age:res.data[i].age,
            weight:res.data[i].weight,
            height:res.data[i].height,
            gender:res.data[i].gender,
            experience:res.data[i].experience,
            trainingHours:res.data[i].trainingHours,
            style:res.data[i].style,
          })
          i = loop
          okEmail = true
        }
      }
        console.log(res.data)
        console.log('after setState')
      })
      .catch(function(error) {console.log(error);
      })
      console.log('finished');
    }
  
onChangeEmail(e){
  this.setState({
    email:e.target.value
  })
}

onChangeName(e){
  this.setState({
  name:e.target.value
  })
}

onChangeAge(e){
  this.setState({
    age:e.target.value
  })
}

onChangeWeight(e){
  this.setState({
    weight:e.target.value
  })
}

onChangeHeight(e){
  this.setState({
    height:e.target.value
  })
}

onChangeGender(e){
  this.setState({
    gender:e.target.value
  })
}

onChangeExperience(e){
  this.setState({
    experience:e.target.value
  })
}

onChangeTrainingHours(e){
  this.setState({
    trainingHours:e.target.value
  })
}

onChangeStyle(e){
  this.setState({
    style:e.target.value
  })
}

   onSubmit(event) {
    event.preventDefault();
    console.log('onSubmit=' + this.state.email);
    const user = {
      email: this.state.email,
      name: this.state.name,
      age: this.state.age,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.gender,
      experience: this.state.experience,
      trainingHours: this.state.trainingHours,
      style: this.state.style
    }
    console.log('user=' + user.style);
        window.$Name = user.name;
        window.$Email = user.email;
        axios.post('/users/update', user)
        .then(res => console.log(res.data));
        this.props.history.push("/FindFight");
    

  }
  render(){
  return (
    <div id="quizPage">
      <br></br>
      <br></br>
      <div className="Quiz" id="Quizbox">
        <h2 id ="startHere">Take Your Placement Quiz</h2>
        <form onSubmit={this.onSubmit}>
          <fieldset id = "fieldset">
            <FormGroup controlId="formBasicQuiz">
            <FormLabel className="formLabel">Your email address:</FormLabel>
            <FormControl type="text" placeholder="email here" disabled="true" value={this.state.email} onChange={this.onChangeEmail}/>
          </FormGroup>
            <br></br>
            <FormGroup controlId="formBasicQuiz">
            <FormLabel className="formLabel" >Your name:</FormLabel>
            <FormControl type="text" placeholder="Name here" disabled="true" value={this.state.name} onChange={this.onChangeName} />
          </FormGroup>
          <br></br>
          <FormGroup controlId="formBasicQuiz">
            <FormLabel className="formLabel">How long have you trained?</FormLabel>
            <FormControl type="text" placeholder="years of experience" value={this.state.experience} onChange={this.onChangeExperience}/>
          </FormGroup>
          <br></br>
          <FormGroup controlId="formBasicQuiz">
            <FormLabel className="formLabel">What is your age?</FormLabel>
            <FormControl type="text"placeholder="" value ={this.state.age} onChange={this.onChangeAge}/>
          </FormGroup>
        
          <br></br>
          <FormGroup controlId="formBasicQuiz">
            <FormLabel className="formLabel">How much do you train weekly?</FormLabel>
            <FormControl type="text" placeholder="i.e.hours a week" value={this.state.trainingHours} onChange={this.onChangeTrainingHours} />
          </FormGroup>
          <br></br>
          <FormGroup controlId="formBasicQuiz">
            <FormLabel className="formLabel">How much do you weigh?</FormLabel>
            <FormControl type="text" placeholder="determine your weight class" value={this.state.weight} onChange={this.onChangeWeight}/>
          </FormGroup>
          <br></br>
          <FormGroup controlId="formBasicQuiz">
            <FormLabel className="formLabel">How tall are you?</FormLabel>
            <FormControl type="text" placeholder="i.e.height in inches" value={this.state.height} onChange={this.onChangeHeight} />
          </FormGroup>
          </fieldset>
          <br></br>
          <RadioGroup name ="rbGender" id="gender"> Gender: 
          <fieldset>

            <Radio type="radio" className="radio-button" value="M" checked={this.state.gender === "M"} onChange={this.onChangeGender}/> 
          Male
        
            <Radio type="radio" className="radio-button" value="F"checked={this.state.gender === "F"} onChange={this.onChangeGender} />
           Female
           </fieldset>
          </RadioGroup>
          
          <br></br>
          <FormGroup>
              <FormLabel id ="style">Style:</FormLabel>
          <RadioGroup name ="rbStyle">
            <fieldset>
            <br></br>
            <Radio type="radio" className="radio-button" value ="S" checked={this.state.style === "S"} onChange={this.onChangeStyle}
            /> Striker
      
            <Radio type="radio" className="radio-button" value ="G" checked={this.state.style === "G"} onChange={this.onChangeStyle} 
            />
                Grappler 
           
            <Radio type="radio" className="radio-button" value ="B" checked={this.state.style === "B"} onChange={this.onChangeStyle}
            /> Both
            </fieldset>
          </RadioGroup>
          </FormGroup>
          <br></br>
          <Button variant="primary" type="submit" id ="button">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
}

