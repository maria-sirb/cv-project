import React, {Component} from "react";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Personal } from "./components/Personal";
import { componentsMap } from "./componentsMap";
class App extends Component{

  
  constructor(){
    super();
    this.state = {
      currentStep : "Personal",
      personal: {},
      education: {},
      experience: {}
    };

    this.changeStep = this.changeStep.bind(this);
    this.getDataFromChild = this.getDataFromChild.bind(this);
  }

  
  getDataFromChild(step, childData){

    this.setState({[step.toLowerCase()] : {...childData}});
  }

  changeStep(e) {

    this.setState({currentStep: e.target.id});

  }

  render() { 

    let Step = componentsMap[this.state.currentStep];
    return(
      <div className="App">
        <div className = "Steps">
          <div onClick={this.changeStep} id = "Personal">Personal</div>
          <div onClick={this.changeStep} id = "Education">Education</div>
          <div onClick={this.changeStep} id = "Experience">Experience</div>
        </div>
      <Step title = {this.state.currentStep} formData = {this.state[this.state.currentStep.toLowerCase()]} passData = {this.getDataFromChild}/> 
      </div>
    );
  }
}

export default App;
