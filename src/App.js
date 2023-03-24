import React, {Component} from "react";
import { Education } from "./components/Education";
import { Experience } from "./components/Work";
import { Personal } from "./components/Personal";
import { componentsMap } from "./componentsMap";
import { Template } from "./components/Template";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./css/App.css";
import { act } from "react-dom/test-utils";
class App extends Component{

  
  constructor(){
    super();
    this.state = {
      steps : ["Personal", "Education", "Work", "Skills", "Template"],
      currentStep : 0,
      personal: {},
      education: [],
      work: [],
      skills: [],
      template: null
    };

    this.changeStep = this.changeStep.bind(this);
    this.getDataFromChild = this.getDataFromChild.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    
  }

  
  getDataFromChild(step, childData){

    if(step == "Personal")
    {
      this.setState({personal : {...childData}});
      this.goToNextStep();

    }
    else
    {
      this.setState({[step.toLowerCase()] : [...childData]});
    }
    
    
  }

  goToNextStep(e)
  {
    return (this.state.currentStep < this.state.steps.length - 1) ? this.setState({currentStep : this.state.currentStep + 1}) : null;
  }
  goBack(e){

    return (this.state.currentStep > 0) ? this.setState({currentStep : this.state.currentStep - 1}) : null;
  }

  changeStep(e) {

    let stepName =  e.target.id;
    let stepIndex = this.state.steps.indexOf(stepName);
    this.setState({currentStep: stepIndex});

  }

  render() { 

    let nextBtnClass, backBtnClass;
    if(this.state.currentStep == 0)
    {
      backBtnClass = "inactive"
    } 
    else{
      backBtnClass = "active"
    }
    if(this.state.currentStep == 4)
    {
      nextBtnClass = "inactive"
    } 
    else{
      nextBtnClass = "active"
    }
    let Step = componentsMap[this.state.steps[this.state.currentStep]];
    let componentToDisplay;
    return(
      <div className="App">
        <div className = "Steps">
          <div>
            <svg onClick={this.changeStep} id = "Personal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
            <div className="step">Personal</div>
          </div>
          <div>
            <svg onClick={this.changeStep} id = "Education" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
            </svg>
            <div className="step">Education</div>
          </div>
          <div>
            <svg onClick={this.changeStep} id = "Work" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z" />
            </svg>
            <div className="step">Work</div>
          </div>
          <div>
            <svg onClick={this.changeStep} id = "Skills" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z" />
            </svg>
            <div className="step">Skills</div>
          </div>
          <div>
            <svg onClick={this.changeStep} id = "Template" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
            </svg>
            <div className="step">Template</div>
          </div>
        </div>
        <div className="content">
       {
         
         (this.state.currentStep < this.state.steps.length - 1)? 
         (
            <Step title = {this.state.steps[this.state.currentStep]} formData = {this.state[this.state.steps[this.state.currentStep].toLowerCase()]} passData = {this.getDataFromChild}/> 
         ) :
         (
            <Template title = "Template" personal = {this.state.personal} education = {this.state.education} work = {this.state.work} skills = {this.state.skills} passData = {this.getDataFromChild}></Template>
         )
          
       }
       </div>
       
      
     <div className="nav-buttons">
        <button className = {backBtnClass} onClick = {this.goBack}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
          <p>Back</p>
        </button>
       <button className = {nextBtnClass} onClick={this.goToNextStep}>
          <p>Next</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
        </button>
     </div>
     </div>
    );
  }
}

export default App;
