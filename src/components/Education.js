import React, {Component} from "react";
export class Education extends Component{

    constructor(props) {

        super(props);
    }
    render() {

        return (
            <h1>{this.props.title}</h1>
        );
    }
}