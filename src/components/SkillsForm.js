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
            <form onSubmit={this.submitData} className = "skills-form">
                <div className="skill-elem1">
                    <label htmlFor = "skill">Skill</label>
                    <input type = "text" name = "skill" id = "skill" defaultValue = {this.state.skill}></input>
                </div>
                <div className="skill-elem2">
                    <p>Level</p>
                    <select name = "level"  defaultValue = {this.state.level}>
                        <option value = "beginner">Beginner</option>
                        <option value = "intermediate">Intermediate</option>
                        <option value = "skillful">Skillful</option>
                        <option value = "experienced">Experienced</option>
                        <option value = "expert">Expert</option>
                    </select>
                </div>
                <button type = "submit" className="skill-elem3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
                    <p>Save</p>
                </button>
                <button type = "button" className = "skill-elem4" onClick={this.discardChanges}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                    <p>Cancel</p>
                </button>
            </form>
        );
    }
}