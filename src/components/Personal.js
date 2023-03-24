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

        return (
            <div className="personal">
                <h1>{this.props.title}</h1>
                <form onSubmit={this.submitData}>
                    <div className= {["photo-section", "item1"].join(' ')}>
                        <div className= "input-container">
                            <img src = {this.state.photo}></img>
                            <div className="photo-options">
                                <button className = "remove-btn" type = "button" onClick={this.removePhoto}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>remove photo</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                                </button>
                                <label className = "add-btn" htmlFor = "photo">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>add photo</title><path d="M13.09 20H6L12 14L13.88 15.88C14.5 14.9 15.36 14.1 16.4 13.6L18 12V13.09C18.33 13.04 18.66 13 19 13C19.34 13 19.67 13.04 20 13.09V8L14 2H6C4.89 2 4 2.89 4 4V20C4 21.1 4.89 22 6 22H13.81C13.46 21.39 13.21 20.72 13.09 20M13 3.5L18.5 9H13V3.5M8 9C9.11 9 10 9.9 10 11S9.11 13 8 13 6 12.11 6 11 6.9 9 8 9M20 15V18H23V20H20V23H18V20H15V18H18V15H20Z" /></svg>
                                </label>
                            </div>
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
                    <button type = "submit" className="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
                        <p>Save</p>
                    </button>
                </form>
            </div>
        );
    }
}