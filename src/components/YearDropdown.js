import React, {Component} from "react";
export class YearDropdown extends Component{

    constructor(props) {

        super(props);
        this.state = {
            year: (new Date()).getFullYear()
        };
        this.years = Array.from(new Array(60),(val, index) => (new Date()).getFullYear() + 6 - index);
    
        this.chooseYear = this.chooseYear.bind(this);
    }

    chooseYear(e){
        let chosenYear = e.target.value
        this.setState({year: chosenYear});
        this.props.saveYear(chosenYear, this.props.title);
    }
    render() {

        return (
            <select onChange={this.chooseYear} defaultValue = {this.props.default}>
                {
                     this.years.map((year, index) => {
                        return <option key={`year${index}`} value={year}>{year}</option>
                      })
                }
            </select>
        );
    }
}