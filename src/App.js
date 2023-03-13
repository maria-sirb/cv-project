import React, {Component} from "react";
import { Education } from "./components/Education";
import { Experience } from "./components/Work";
import { Personal } from "./components/Personal";
import { componentsMap } from "./componentsMap";
class App extends Component{

  
  constructor(){
    super();
    this.state = {
      steps : ["Personal", "Education", "Work", "Skills"],
      currentStep : 0,
      personal: {},
      education: [],
      work: [],
      skills: []
    };

    this.changeStep = this.changeStep.bind(this);
    this.getDataFromChild = this.getDataFromChild.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
  }

  
  getDataFromChild(step, childData){

   // console.log(childData);
   // this.setState({[step.toLowerCase()] : [...childData]});
    if(step == "Personal")
    {
      this.setState({personal : {...childData}});

    }
    else
    {
      //this.setState({education : [...this.state.education, {...childData}]});
      this.setState({[step.toLowerCase()] : [...childData]});
     // this.setState({currentStep : "Experience"});
    }
    
    
  }

  goToNextStep()
  {
    return (this.state.currentStep < this.state.steps.length - 1) ? this.setState({currentStep : this.state.currentStep + 1}) : null;
  }
  goBack(){
    return (this.state.currentStep > 0) ? this.setState({currentStep : this.state.currentStep - 1}) : null;
  }

  changeStep(e) {

    let stepName =  e.target.id;
    let stepIndex = this.state.steps.indexOf(stepName);
    this.setState({currentStep: stepIndex});

  }

  render() { 

    console.log(this.state);
    let Step = componentsMap[this.state.steps[this.state.currentStep]];
    return(
      <div className="App">
        <div className = "Steps">
          <div onClick={this.changeStep} id = "Personal">Personal</div>
          <div onClick={this.changeStep} id = "Education">Education</div>
          <div onClick={this.changeStep} id = "Work">Work Experience</div>
          <div onClick={this.changeStep} id = "Skills">Skills</div>
        </div>
      <Step title = {this.state.steps[this.state.currentStep]} formData = {this.state[this.state.steps[this.state.currentStep].toLowerCase()]} passData = {this.getDataFromChild}/> 
     <button onClick = {this.goBack}>Back</button>
     <button onClick={this.goToNextStep}>Next</button>
      </div>
    );
  }
}

export default App;
