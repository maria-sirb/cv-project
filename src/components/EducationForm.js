import React, {Component} from "react";
import { MonthDropdown } from "./MonthDropdown";
import { YearDropdown } from "./YearDropdown";
export class EducationForm extends Component{

    constructor(props) {

        super(props);
        if(!this.props.formData)
        {
            this.state = {
                education:{
                   startMonth: "September",
                    startYear: (new Date()).getFullYear().toString(),
                    endMonth: "September",
                    endYear: (new Date()).getFullYear().toString()
                }
            }
        }
        else
        {
            this.state = { education : {...this.props.formData}}
        }

        this.setMonth = this.setMonth.bind(this);
        this.setYear = this.setYear.bind(this);
        this.submitData = this.submitData.bind(this);
        this.discard = this.discard.bind(this);
    }

    setMonth(value, time){
        this.setState({education : {...this.state.education,
            [time + "Month"] : value}});
    }
    setYear(value, time){
        this.setState({education : {...this.state.education,
                     [time + "Year"] : value}});
    }

    discard(e){
        this.props.discardData(this.props.edit);
    }

    submitData(e){
        e.preventDefault();
        let formData = {
            degree : e.target.degree.value,
            city: e.target.city.value,
            school : e.target.school.value,
            startMonth: this.state.education.startMonth,
            startYear: this.state.education.startYear,
            endMonth: this.state.education.endMonth,
            endYear: this.state.education.endYear,

        };
        console.log(formData);
        console.log(e.target.degree.value);
        this.setState({education : {...formData}});
        this.props.passData(this.props.edit, formData);

    }
    render() {

        return (

            <form onSubmit={this.submitData}>
                {
                    (this.props.edit) ? <h1>Edit Education</h1> : <h1>New Education</h1>
                }
                <div>
                    <label htmlFor="degree">Degree</label>
                    <input type = "text" id = "degree" name = "degree" defaultValue={this.state.education.degree}></input>
                </div>
                <div>
                    <label htmlFor="city">City/Town</label>
                    <input type = "text" id = "city" name = "city" defaultValue = {this.state.education.city}></input>
                </div>
                <div>
                    <label htmlFor="school">School</label>
                    <input type = "text" id = "school" name = "school" defaultValue={this.state.education.school}></input>
                </div>
                <div>
                    <h2>Start Date</h2>
                    <MonthDropdown title = "start" saveMonth = {this.setMonth} default = {this.state.education.startMonth}></MonthDropdown>
                    <YearDropdown title = "start" saveYear = {this.setYear} default = {this.state.education.startYear}></YearDropdown>
                </div>
                <div>
                    <h2>End Date</h2>
                    <MonthDropdown title = "end"  saveMonth = {this.setMonth} default = {this.state.education.endMonth}></MonthDropdown>
                    <YearDropdown title = "end" saveYear = {this.setYear} default = {this.state.education.endYear}></YearDropdown>
                </div>
                <button type = "submit">Save</button>
                <button type = "button" onClick={this.discard}>Cancel</button>
            </form>
            
        );
    }
}