import React, {Component} from "react";
export class SkillsForm extends Component{

    constructor(props) {

        super(props);
        if(this.props.formData)
        {
            this.state = {
                skill : this.props.formData.skill,
                level : this.props.formData.level

            }
        }
        else {
            this.state = {
                skill : "",
                level: ""
            }
        }

        this.submitData = this.submitData.bind(this);
        this.discardChanges = this.discardChanges.bind(this);
    }
    submitData(e){

        e.preventDefault();
        let formData = {
            skill: e.target.skill.value,
            level: e.target.level.value
        }
        this.setState({skill : {...formData}});
        this.props.passData(this.props.edit, formData);
    }
    discardChanges(){
        this.props.discardData(this.props.edit);
    }
    render() {

        return (
            <form onSubmit={this.submitData}>
                <div>
                    <label htmlFor = "skill">Skill</label>
                    <input type = "text" name = "skill" id = "skill" defaultValue = {this.state.skill}></input>
                </div>
                <p>Level</p>
                <select name = "level"  defaultValue = {this.state.level}>
                    <option value = "beginner">Beginner</option>
                    <option value = "intermediate">Intermediate</option>
                    <option value = "skillful">Skillful</option>
                    <option value = "experienced">Experienced</option>
                    <option value = "expert">Expert</option>
                </select>
                <button type = "submit">Save</button>
                <button type = "button" onClick={this.discardChanges}>Cancel</button>
            </form>
        );
    }
}