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
            <div className="step-content">
                <h1>{this.props.title}</h1>
                <div className="items">
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
                            <div className="item-text">
                                <h3>{experience[experienceTypeNames[0]]}</h3>
                                <p>{experience[experienceTypeNames[2]] + ", " + experience[experienceTypeNames[1]]}</p>
                                <div className="date">
                                    <p>{experience.startMonth + " " + experience.startYear + " - " + experience.endMonth + " " + experience.endYear}</p>
                                </div>
                            </div>
                            <div className="options-btns">
                                <button id = {"edit-" + index} onClick = {this.edit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>edit</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                                </button>
                                <button id = {"delete-" + index} onClick = {this.delete}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>                                
                                </button>
                            </div>
                            </div>
                        ) : 
                        (display = <FormToDisplay key = {index} edit = {true} number = {index} discardData = {this.discardFormChanges} passData = {this.getDataFromForm} formData = {this.state.experiences[index]}></FormToDisplay>)
                       
                        return display;
                    })
                }
                </div>
                <div className="creation-container">
                    <button type = "button" onClick={this.addForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                        <p>Add {this.props.title}</p>
                    </button>
                    {
                        (this.state.activeForm == -1) ? (<FormToDisplay edit = {false} number = {this.state.number} discardData = {this.discardFormChanges} passData = {this.getDataFromForm} formData = {this.state.experiences[this.state.number]}></FormToDisplay>) : null
                    }
                </div>  
            </div>
        );
    }
}