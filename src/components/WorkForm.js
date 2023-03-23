import React, {Component} from "react";
import { MonthDropdown } from "./MonthDropdown";
import { YearDropdown } from "./YearDropdown";
export class WorkForm extends Component{

    constructor(props) {

        super(props);
        if(!this.props.formData)
        {
            this.state = {
                work:{
                   startMonth: "September",
                    startYear: (new Date()).getFullYear().toString(),
                    endMonth: "September",
                    endYear: (new Date()).getFullYear().toString()
                }
            }
        }
        else
        {
            this.state = { work : {...this.props.formData}}
        }

        this.setMonth = this.setMonth.bind(this);
        this.setYear = this.setYear.bind(this);
        this.submitData = this.submitData.bind(this);
        this.discard = this.discard.bind(this);
    }
    setMonth(value, time){
        this.setState({work : {...this.state.work,
            [time + "Month"] : value}});
    }
    setYear(value, time){
        this.setState({work : {...this.state.work,
                     [time + "Year"] : value}});
    }

    discard(e){
        this.props.discardData(this.props.edit);
    }

    submitData(e){

        e.preventDefault();
        let formData = {
            job : e.target.job.value,
            city: e.target.city.value,
            employer : e.target.employer.value,
            startMonth: this.state.work.startMonth,
            startYear: this.state.work.startYear,
            endMonth: this.state.work.endMonth,
            endYear: this.state.work.endYear,

        };
        this.setState({work : {...formData}});
        this.props.passData(this.props.edit, formData);

    }
    render() {

        return (
            <form onSubmit={this.submitData}>
                <div className="elem1">
                    <label htmlFor="job">Job Title</label>
                    <input type = "text" id = "job" name = "job" defaultValue={this.state.work.job}></input>
                </div>
                <div className="elem2">
                    <label htmlFor="city">City/Town</label>
                    <input type = "text" id = "city" name = "city" defaultValue = {this.state.work.city}></input>
                </div>
                <div className="elem3">
                    <label htmlFor="employer">Employer</label>
                    <input type = "text" id = "employer" name = "employer" defaultValue={this.state.work.employer}></input>
                </div>
                <div className="elem4">
                    <p>Start Date</p>
                    <div className="date-select">
                        <MonthDropdown title = "start" saveMonth = {this.setMonth} default = {this.state.work.startMonth}></MonthDropdown>
                        <YearDropdown title = "start" saveYear = {this.setYear} default = {this.state.work.startYear}></YearDropdown>
                    </div>
                </div>
                <div className="elem5">
                    <p>End Date</p>
                    <div className="date-select">
                        <MonthDropdown title = "end"  saveMonth = {this.setMonth} default = {this.state.work.endMonth}></MonthDropdown>
                        <YearDropdown title = "end" saveYear = {this.setYear} default = {this.state.work.endYear}></YearDropdown>
                    </div>
                </div>
                <button type = "submit"  className="elem6">
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