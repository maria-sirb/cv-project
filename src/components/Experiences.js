import React, {Component} from "react";
import { formsMap } from "../formsMap";
import { EducationForm } from "./EducationForm";
export class Experiences extends Component{

    constructor(props) {

        super(props);
        this.state = {
            number : this.props.formData.length - 1, //the index of the last experience in the list, or the number of elements - 1
            experiences : [...this.props.formData],   //education list
            activeForm : -2  //variable to monitor if there are any opened forms : -2 (no form opened), -1(form for new experience opened), >=0 (form for editing the corresponding element in experience list opened)
        };
        this.addForm = this.addForm.bind(this);
        this.getDataFromForm = this.getDataFromForm.bind(this);
        this.discardFormChanges = this.discardFormChanges.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    addForm(){

        //if there is no other creation form opened, open a new creation form
        if(this.state.activeForm != - 1)
           this.setState({number: this.state.number + 1, experiences : [...this.state.experiences], activeForm : -1});
        
    }

    edit(e){
        //set the active form to be the index of the experience object to edit
        this.setState({activeForm : e.target.id.split('-')[1]});

    }

    delete(e){
        let index = e.target.id.split('-')[1]; //the id of the delete button is the index of the experience element to be deleted
        let newExperiencesList = this.state.experiences.filter(function (val, idx) { return idx != index});         
        this.setState({experiences : [...newExperiencesList]});
        this.props.passData(newExperiencesList); //pas the new experience list to the parent (education/work component)
    }

    discardFormChanges(edit)
    {
        //if the form was an edit form then don't change the number of elements
        //when the form was opened the number of elements was increased by one, but
        //because no new element was created then it must return to it's previous value
        if(!edit)
            this.setState({number : this.state.number - 1});
        this.setState({activeForm : -2});    
    }

    getDataFromForm(edit, childData)
    {
        let newExperiencesList;
        //if data was edited, then replace the experience object
        if(edit)
        {
            newExperiencesList = [...this.state.experiences.slice(0, this.state.activeForm),
                                {...childData},
                            ...this.state.experiences.slice(this.state.activeForm + 1)];
        }
        //if data was added then add new experience to list
        else
        {
            newExperiencesList = [...this.state.experiences, {...childData}];
        }
        this.setState({activeForm: -2});
        this.setState({experiences : [...newExperiencesList]});
        console.log(newExperiencesList);
        this.props.passData(newExperiencesList);
    }

    render() {

        console.log(this.state);
        let experienceTypeNames;
        if(this.props.title == "Work")
        {
            experienceTypeNames = ["job", "city", "employer"];
        }
        else if(this.props.title == "Education")
        {
            experienceTypeNames = ["degree", "city", "school"];
        }
        let FormToDisplay = formsMap[this.props.title];
        return (
            <div>
                <h1>{this.props.title}</h1>
                {
                    this.props.formData.map(experience => {
                        let index = this.props.formData.indexOf(experience); 
                        let display;
                        //if there is not an editing form opened for the current experience element then display it's contents
                        //but if the corresponding experience form is opened then display the form instead of the contents
                        (this.state.activeForm != index) ? 
                        (  
                            display = 
                            <div key = {index}>
                            <h3>{experience[experienceTypeNames[0]]}</h3>
                            <h3>{experience[experienceTypeNames[1]]}</h3>
                            <h3>{experience[experienceTypeNames[2]]}</h3>
                            <p>{experience.startMonth}</p>
                            <p>{experience.startYear}</p>
                            <p>{experience.endMonth}</p>
                            <p>{experience.endYear}</p>
                            <button id = {"edit-" + index} onClick = {this.edit}>Edit</button>
                            <button id = {"delete-" + index} onClick = {this.delete}>Delete</button>
                            </div>
                        ) : 
                        (display = <FormToDisplay key = {index} edit = {true} number = {index} discardData = {this.discardFormChanges} passData = {this.getDataFromForm} formData = {this.state.experiences[index]}></FormToDisplay>)
                       
                        return display;
                    })
                }
                <button type = "button" onClick={this.addForm}>Add {this.props.title}</button>
                {
                    (this.state.activeForm == -1) ? (<FormToDisplay edit = {false} number = {this.state.number} discardData = {this.discardFormChanges} passData = {this.getDataFromForm} formData = {this.state.experiences[this.state.number]}></FormToDisplay>) : null
                }      
            </div>
        );
    }
}