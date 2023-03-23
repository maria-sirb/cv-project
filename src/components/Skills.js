import React, {Component} from "react";
import { SkillsForm } from "./SkillsForm";
import '../css/Experiences.css';
export class Skills extends Component{

    constructor(props) {

        super(props);
        this.state = {
            number : -1,
            skills : [...this.props.formData],
            activeForm: -2
        };
       this.addForm = this.addForm.bind(this);
       this.edit = this.edit.bind(this);
       this.delete = this.delete.bind(this);
       this.discardFormChanges = this.discardFormChanges.bind(this);
       this.getDataFromForm = this.getDataFromForm.bind(this);
       
    } 

    addForm(){
        this.setState({activeForm : -1, number : this.state.number + 1});
    }

    edit(e)
    {
        this.setState({activeForm : e.target.id.split("-")[1]});
    }

    delete(e){
        let index = e.target.id.split("-")[1];
        let newSkillsList = this.state.skills.filter(function (val, idx) { return idx != index});              
        this.setState({skills : [...newSkillsList]});
        this.props.passData("Skills", newSkillsList);
    }

    discardFormChanges(edit)
    {
        if(!edit)
            this.setState({number : this.state.number - 1});
        this.setState({activeForm : -2});    
    }

    getDataFromForm(edit, childData)
    {
        let newSkillsList;
        if(edit)
        {
            newSkillsList = [...this.state.skills.slice(0, this.state.activeForm),
                                {...childData},
                            ...this.state.skills.slice(this.state.activeForm + 1)];
            console.log("editing");                
        }
        else
        {
            newSkillsList = [...this.state.skills, {...childData}];
        }
        this.setState({activeForm: -2});
        this.setState({skills : [...newSkillsList]});
        this.props.passData("Skills", newSkillsList);
        console.log(newSkillsList);
    }
    render() {

        return(
            <div className="step-content">
                <h1>{this.props.title}</h1>
                <div className="items">
                {
                    this.props.formData.map(skill => {
                        let index = this.props.formData.indexOf(skill);
                        let display;
                        (this.state.activeForm != index)?
                        (display = <div key = {index}>
                                    <div className="item-text">
                                        <h2>{skill.skill}</h2>
                                        <p>{skill.level}</p>
                                    </div>
                                    <div className="options-btns">
                                        <button type = "button" id = {"edit-" + index} onClick = {this.edit}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>edit</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                                        </button>
                                        <button type = "button" id = {"delete-" + index} onClick = {this.delete}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                                        </button>
                                    </div>
                                   </div>
                        ) :
                        (
                            display = <SkillsForm key = {index} edit = {true} number = {index} formData = {this.state.skills[index]}  discardData = {this.discardFormChanges} passData = {this.getDataFromForm}></SkillsForm>
                        )
                        return display;

                    })
                }
                </div>
                <div className="creation-container">
                    <button type = "button" onClick={this.addForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                        <p>Add skill</p>
                    </button>
                    {
                        (this.state.activeForm == -1)? <SkillsForm edit = {false} number = {this.state.number} discardData = {this.discardFormChanges} passData = {this.getDataFromForm}></SkillsForm> : null
                    }
                </div>
            </div>
        )

    }
}