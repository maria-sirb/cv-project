import React, {Component} from "react";
import "../css/Personal.css";
export class Personal extends Component{

    constructor(props) {

        super(props);
        this.state = {
            photo :   this.props.formData.photo, 
            firstName : this.props.formData.firstName, 
            lastName : this.props.formData.lastName, 
            email : this.props.formData.email,
            phone : this.props.formData.phone, 
            address : this.props.formData.address, 
            city : this.props.formData.city
        };
        if(!this.props.formData.photo)
        {
            this.state.photo = "/person.png";
        }
        this.submitData = this.submitData.bind(this);
        this.displayPhoto = this.displayPhoto.bind(this);
        this.removePhoto = this.removePhoto.bind(this);
    }

    submitData(e) {

        e.preventDefault();
        let photoUrl;
        (e.target.photo.files[0]) ? photoUrl = URL.createObjectURL(e.target.photo.files[0]) : photoUrl = "/person.png";
        let formData = { 
            photo :   photoUrl, 
            firstName : e.target.firstName.value, 
            lastName : e.target.lastName.value, 
            email : e.target.email.value,
            phone : e.target.phone.value, 
            address : e.target.address.value, 
            city : e.target.city.value
        };
        this.setState({...formData});
        this.props.passData(this.props.title, formData);                

    }
    removePhoto(e){
        this.setState({photo: "/person.png"});
    }

    displayPhoto(e){
        this.setState({photo : URL.createObjectURL(e.target.files[0])});
    }

    render() {

        console.log(this.state);
        return (
            <div className="personal">
                <h1>{this.props.title}</h1>
                <form onSubmit={this.submitData}>
                    <div className= {["photo-section", "item1"].join(' ')}>
                        <div className= "input-container">
                            <img src = {this.state.photo}></img>
                            <button type = "button" onClick={this.removePhoto}>Remove</button>
                            <label htmlFor = "photo">Add Photo</label>
                            <input type = "file" id = "photo" name = "photo" accept="image/png, image/jpeg" onChange = {this.displayPhoto} ></input>
                        </div>
                    </div>
                    <div className= {["input-container", "item2"].join(' ')}>
                        <label htmlFor = "first-name">First Name*</label>
                        <input type = "text" id = "first-name" name = "firstName" defaultValue = {this.state.firstName} required></input>
                    </div>
                    <div className= {["input-container", "item3"].join(' ')}>
                        <label htmlFor = "last-name">Last Name*</label>
                        <input type = "text" id = "last-name" name = "lastName" defaultValue = {this.state.lastName} required></input>
                    </div>
                    <div className= {["input-container", "item4"].join(' ')}>
                        <label htmlFor = "email">Email*</label>
                        <input type = "email" id = "email" name = "email" defaultValue = {this.state.email} required></input>
                    </div>
                    <div className= {["input-container", "item5"].join(' ')}>
                        <label htmlFor = "phone">Phone Number</label>
                        <input type = "text" id = "phone" name = "phone" defaultValue = {this.state.phone}></input>
                    </div>
                    <div className= {["input-container", "item6"].join(' ')}>
                        <label htmlFor = "addrerss">Address</label>
                        <input type = "text" id = "address" name = "address" defaultValue = {this.state.address}></input>
                    </div>
                    <div className= {["input-container", "item7"].join(' ')}>
                        <label htmlFor = "city">City/Town</label>
                        <input type = "text" id = "city" name = "city" defaultValue = {this.state.city}></input>
                    </div>
                    <button type = "submit" className="submit">Save</button>
                </form>
            </div>
        );
    }
}