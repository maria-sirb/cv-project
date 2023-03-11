import React, {Component} from "react";
import { EducationForm } from "./EducationForm";
export class Education extends Component{

    constructor(props) {

        super(props);
        this.state = {
            number : this.props.formData.length - 1, //the index of the last education in the list, or the number of elements - 1
            education : [...this.props.formData],   //education list
            activeForm : -2  //variable to monitor if there are any opened forms : -2 (no form opened), -1(form for new education opened), >=0 (form for editing the corresponding element in education list opened)
        };
        this.addEducationForm = this.addEducationForm.bind(this);
        this.getDataFromForm = this.getDataFromForm.bind(this);
        this.discardFormChanges = this.discardFormChanges.bind(this);
        this.editEducation = this.editEducation.bind(this);
        this.deleteEducation = this.deleteEducation.bind(this);
    }

    addEducationForm(){

        //if there is no other creation form opened, open a new creation form
        if(this.state.activeForm != - 1)
           this.setState({number: this.state.number + 1, education : [...this.state.education], activeForm : -1});
        
    }

    editEducation(e){
        //set the active form to be the index of the education object to edit
        this.setState({activeForm : e.target.id.split('-')[1]});

    }

    deleteEducation(e){
        let index = e.target.id.split('-')[1]; //the id of the delete button is the index of the education element to be deleted
        let newEducationList = [...this.state.education.slice(0, index),
                                ...this.state.education.slice(index + 1)];
        this.setState({education : [...newEducationList]});
        this.props.passData("Education", newEducationList); //pas the new education list to the parent (app component)
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
        let newEducationList;
        //if data was edited, then replace the education object
        if(edit)
        {
            newEducationList = [...this.state.education.slice(0, this.state.activeForm),
                                {...childData},
                            ...this.state.education.slice(this.state.activeForm + 1)];
        }
        //if data was added then add new education to list
        else
        {
            newEducationList = [...this.state.education, {...childData}];
        }
        this.setState({activeForm: -2});
        this.setState({education : [...newEducationList]});
        this.props.passData("Education", newEducationList);
    }

    render() {

       // console.log(this.props.formData);
        console.log(this.state);
        return (
            <div>
                <h1>{this.props.title}</h1>
                {
                    this.props.formData.map(education => {
                        let index = this.props.formData.indexOf(education); 
                        let display;
                        //if there is not an editing form opened for the current education element then display it's contents
                        //but if the corresponding editing form is opened then display the form instead of the contents
                        (this.state.activeForm != index) ? 
                        (  
                            display = 
                            <div key = {index}>
                            <h3>{education.degree}</h3>
                            <h3>{education.city}</h3>
                            <h3>{education.school}</h3>
                            <p>{education.startMonth}</p>
                            <p>{education.startYear}</p>
                            <p>{education.endMonth}</p>
                            <p>{education.endYear}</p>
                            <button id = {"edit-" + index} onClick = {this.editEducation}>Edit</button>
                            <button id = {"delete-" + index} onClick = {this.deleteEducation}>Delete</button>
                            </div>
                        ) : 
                        (display = <EducationForm key = {index} edit = {true} number = {index} discardData = {this.discardFormChanges} passData = {this.getDataFromForm} formData = {this.state.education[index]}></EducationForm>)
                       
                        return display;
                    })
                }
                <button type = "button" onClick={this.addEducationForm}>Add education</button>
                {
                    (this.state.activeForm == -1) ? (<EducationForm edit = {false} number = {this.state.number} discardData = {this.discardFormChanges} passData = {this.getDataFromForm} formData = {this.state.education[this.state.number]}></EducationForm>) : null
                }   
                
            </div>
        );
    }
}