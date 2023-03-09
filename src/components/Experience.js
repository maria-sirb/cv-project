import React, {Component} from "react";
export class Experience extends Component{

    constructor(props) {

        super(props);
    }
    render() {

        return (
            <h1>{this.props.title}</h1>
        );
    }
}