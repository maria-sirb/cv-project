import React, {Component} from "react";
import { Experiences } from "./Experiences";
export class Work extends Component{

    constructor(props) {

        super(props);
        this.state = {
           work: [...this.props.formData]
        };
        this.getData = this.getData.bind(this);
       
    }
    getData(childData){
        console.log(childData);
        this.setState({work : [...childData]});
        this.props.passData("Work", childData);
    }
    render() {

        return (

            <div>
                <Experiences title = "Work" formData = {this.state.work} passData = {this.getData}></Experiences>
            </div>
        );
    }
}