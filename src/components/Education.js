import React, {Component} from "react";
import { Experiences } from "./Experiences";
export class Education extends Component{

    constructor(props) {

        super(props);
        this.state = {
           education: [...this.props.formData]
        };
        this.getData = this.getData.bind(this);
       
    }
    getData(childData){
        console.log(childData);
        this.setState({education : [...childData]});
        this.props.passData("Education", childData);
    }
    render() {

        return (

            <div>
                <Experiences title = "Education" formData = {this.state.education} passData = {this.getData}></Experiences>
            </div>
        );
    }
}
