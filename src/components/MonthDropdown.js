import React, {Component} from "react";
export class MonthDropdown extends Component{

    constructor(props) {

        super(props);
        this.state = {
            month: "September"
        }
        this.chooseMonth = this.chooseMonth.bind(this);
    }

    chooseMonth(e){
        let chosenMonth = e.target.value;
        this.setState({month: chosenMonth});
        this.props.saveMonth(chosenMonth, this.props.title);
    }

    render() {

        return (
            <div>
            <select name="start" onChange={this.chooseMonth} defaultValue = {this.props.default} >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September" defaultChecked>September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
            </select>
            </div>
        );
    }
}