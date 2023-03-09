import React, {Component} from "react";
export class Personal extends Component{

    constructor(props) {

        super(props);
        this.state = {

        };
        this.submitData = this.submitData.bind(this);
    }

    submitData(e) {

        e.preventDefault();
        let formData = { 
            photo : e.target.photo.value, 
            firstName : e.target.firstName.value, 
            lastName : e.target.lastName.value, 
            email : e.target.email.value,
            phone : e.target.phone.value, 
            address : e.target.address.value, 
            city : e.target.city.value};

        this.setState({...formData});
        this.props.passData(this.props.title, formData);                

    }

    render() {

        return (
            <div>
                <h1>{this.props.title}</h1>
                <form onSubmit={this.submitData}>
                    <div>
                        <label htmlFor = "photo">Photo</label>
                        <input type = "file" id = "photo" name = "photo" accept="image/png, image/jpeg" defaultValue = {this.props.formData.photo || ""}></input>
                    </div>
                    <div>
                        <label htmlFor = "first-name">First Name*</label>
                        <input type = "text" id = "first-name" name = "firstName" defaultValue = {this.props.formData.firstName || ""} required></input>
                    </div>
                    <div>
                        <label htmlFor = "last-name">Last Name*</label>
                        <input type = "text" id = "last-name" name = "lastName" defaultValue = {this.props.formData.lastName || ""} required></input>
                    </div>
                    <div>
                        <label htmlFor = "email">Email*</label>
                        <input type = "email" id = "email" name = "email" defaultValue = {this.props.formData.email || ""} required></input>
                    </div>
                    <div>
                        <label htmlFor = "phone">Phone Number</label>
                        <input type = "text" id = "phone" name = "phone" defaultValue = {this.props.formData.phone || ""}></input>
                    </div>
                    <div>
                        <label htmlFor = "addrerss">Address</label>
                        <input type = "text" id = "address" name = "address" defaultValue = {this.props.formData.address || ""}></input>
                    </div>
                    <div>
                        <label htmlFor = "city">City/Town</label>
                        <input type = "text" id = "city" name = "city" defaultValue = {this.props.formData.city || ""}></input>
                    </div>
                    <button type = "submit">Submit</button>
                </form>
            </div>
        );
    }
}