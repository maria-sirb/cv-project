import React, {Component} from "react";
import { Education } from "./components/Education";
import { Experience } from "./components/Work";
import { Personal } from "./components/Personal";
import { componentsMap } from "./componentsMap";
class App extends Component{

  
  constructor(){
    super();
    this.state = {
      currentStep : "Personal",
      personal: {},
      education: [],
      work: []
    };

    this.changeStep = this.changeStep.bind(this);
    this.getDataFromChild = this.getDataFromChild.bind(this);
  }

  
  getDataFromChild(step, childData){

   // console.log(childData);
   // this.setState({[step.toLowerCase()] : [...childData]});
    if(step == "Personal")
    {
      this.setState({personal : {...childData}});
      this.setState({currentStep : "Education"});
    }
    else if(step == "Education")
    {
      //this.setState({education : [...this.state.education, {...childData}]});
      this.setState({education : [...childData]});
     // this.setState({currentStep : "Experience"});
    }
    else if(step == "Work")
    {
      this.setState({work : [...childData]});
    }
    
  }

  goToNextStep(step)
  {
    
  }

  changeStep(e) {

    this.setState({currentStep: e.target.id});

  }

  render() { 

    console.log(this.state);
    let Step = componentsMap[this.state.currentStep];
    return(
      <div className="App">
        <div className = "Steps">
          <div onClick={this.changeStep} id = "Personal">Personal</div>
          <div onClick={this.changeStep} id = "Education">Education</div>
          <div onClick={this.changeStep} id = "Work">Work Experience</div>
        </div>
      <Step title = {this.state.currentStep} formData = {this.state[this.state.currentStep.toLowerCase()]} passData = {this.getDataFromChild}/> 
      </div>
    );
  }
}

export default App;
