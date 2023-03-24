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
        this.setState({education : {...formData}});
        this.props.passData(this.props.edit, formData);

    }
    render() {

        return (

            <form onSubmit={this.submitData}>
                <div className="elem1">
                    <label htmlFor="degree">Degree</label>
                    <input type = "text" id = "degree" name = "degree" defaultValue={this.state.education.degree}></input>
                </div>
                <div className="elem2">
                    <label htmlFor="city">City/Town</label>
                    <input type = "text" id = "city" name = "city" defaultValue = {this.state.education.city}></input>
                </div>
                <div className="elem3">
                    <label htmlFor="school">School</label>
                    <input type = "text" id = "school" name = "school" defaultValue={this.state.education.school}></input>
                </div>
                <div className="elem4">
                    <p>Start Date</p>
                    <div className="date-select">
                        <MonthDropdown title = "start" saveMonth = {this.setMonth} default = {this.state.education.startMonth}></MonthDropdown>
                        <YearDropdown title = "start" saveYear = {this.setYear} default = {this.state.education.startYear}></YearDropdown>
                    </div>
                </div>
                <div className="elem5">
                    <p>End Date</p>
                    <div className="date-select">
                        <MonthDropdown title = "end"  saveMonth = {this.setMonth} default = {this.state.education.endMonth}></MonthDropdown>
                        <YearDropdown title = "end" saveYear = {this.setYear} default = {this.state.education.endYear}></YearDropdown>
                    </div>
                </div>
                <button type = "submit" className="elem6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
                    <p>Save</p>
                </button>
                <button type = "button"  className="elem7" onClick={this.discard}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                    <p>Cancel</p>
                </button>
            </form>
            
        );
    }
}