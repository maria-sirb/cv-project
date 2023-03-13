import React, {Component} from "react";
import { SkillsForm } from "./SkillsForm";
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
        let newSkillsList = [...this.state.skills.slice(0, index),
                              ...this.state.skills.slice(index + 1)];
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
            <div>
                <h1>{this.props.title}</h1>
                {
                    this.props.formData.map(skill => {
                        let index = this.props.formData.indexOf(skill);
                        let display;
                        (this.state.activeForm != index)?
                        (display = <div key = {index}>
                                    <h2>{skill.skill}</h2>
                                    <p>{skill.level}</p>
                                    <button type = "button" id = {"edit-" + index} onClick = {this.edit}>Edit</button>
                                    <button type = "button" id = {"delete-" + index} onClick = {this.delete}>Delete</button>
                                   </div>
                        ) :
                        (
                            display = <SkillsForm key = {index} edit = "true" number = {index} formData = {this.state.skills[index]}  discardData = {this.discardFormChanges} passData = {this.getDataFromForm}></SkillsForm>
                        )
                        return display;

                    })
                }
                <button type = "button" onClick={this.addForm}>Add skill</button>
                {
                    (this.state.activeForm == -1)? <SkillsForm edit = "false" number = {this.state.number} discardData = {this.discardFormChanges} passData = {this.getDataFromForm}></SkillsForm> : null
                }
            </div>
        )

    }
}