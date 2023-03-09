import React, {Component} from "react";
export class Personal extends Component{

    constructor(props) {

        super(props);
    }
    
    render() {

        return (
            <h1>{this.props.title}</h1>
        );
    }
}