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
                <div>
                    <label htmlFor="job">Job Title</label>
                    <input type = "text" id = "job" name = "job" defaultValue={this.state.work.job}></input>
                </div>
                <div>
                    <label htmlFor="city">City/Town</label>
                    <input type = "text" id = "city" name = "city" defaultValue = {this.state.work.city}></input>
                </div>
                <div>
                    <label htmlFor="employer">Employer</label>
                    <input type = "text" id = "employer" name = "employer" defaultValue={this.state.work.employer}></input>
                </div>
                <div>
                    <h2>Start Date</h2>
                    <MonthDropdown title = "start" saveMonth = {this.setMonth} default = {this.state.work.startMonth}></MonthDropdown>
                    <YearDropdown title = "start" saveYear = {this.setYear} default = {this.state.work.startYear}></YearDropdown>
                </div>
                <div>
                    <h2>End Date</h2>
                    <MonthDropdown title = "end"  saveMonth = {this.setMonth} default = {this.state.work.endMonth}></MonthDropdown>
                    <YearDropdown title = "end" saveYear = {this.setYear} default = {this.state.work.endYear}></YearDropdown>
                </div>
                <button type = "submit">Save</button>
                <button type = "button" onClick={this.discard}>Cancel</button>
            </form>
        );
    }
}