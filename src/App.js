import React from 'react';
import './App.css';
import {isOnlyText, isEmailValid, isGreaterThanTwo, isValid, isPassword, confirm, isNumber} from "./validators/helpers";


class App extends React.Component{

  constructor(props) {
    super(props);
   this.state ={
     isValid: false,
     user: {
       fullName: "",
       email: "",
       password:"",
       confirmPassword: "",
       date:"",
       number:"",
       pin:""
     },
     error:{
       fullName: "",
       email: "",
       password: "",
       confirmPassword: "",
       date: "",
       number: "",
       pin:""
     }
   }


  }
  handleSubmit =(e)=>{
    e.preventDefault();
  }
  handleChange = (e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(prevState => ({
      user:{
        ...prevState.user,
        [name]: value
      }
    }))
    this.setState(prevState => ({
      error: {
        ...prevState.error,
        [name]: value
      }
    }));
    switch (name) {
      case 'fullName':
        if ((!isOnlyText(value) && value ) || !isGreaterThanTwo(value)){
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              fullName: 'Name must have more than 2 characters'
            }
          }))
        }
        else {
          this.setState(prevState =>({
            error: {
              ...prevState.error,
              fullName:''
            }
          }))
        }
        break;
      case 'email':
        if (!isEmailValid(value)){
         this.setState(prevState => ({
           error: {
             ...prevState.error,
             email: 'email is invalid'
           }
         }))
        }
        else{
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              email: ''
            }
          }))
        }
        break;
      case 'number':
        if (!isNumber(value) && value){
         this.setState(prevState => ({
           error: {
             ...prevState.error,
             number: 'number is invalid'
           }
         }))
        }
        else{
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              number: ''
            }
          }))
        }
        break;
      case 'password':
        if (!isPassword(value)){
         this.setState(prevState => ({
           error: {
             ...prevState.error,
             password: 'password is invalid'
           }
         }))
        }
        else{
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              password: ''
            }
          }))
        }
        break;
      case 'confirmPassword':
        if (!isPassword(value) !== !confirm(value)){
         this.setState(prevState => ({
           error: {
             ...prevState.error,
             password: 'password does not match the above'
           }
         }))
        }
        else{
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              password: ''
            }
          }))
        }
        break;

      case  'pin':
        if (!isValid(value) && value){
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              pin: 'pin must be a number and must not be less than or greater than 4'
            }
          }))
        }
        else{
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              pin: ''
            }
          }))
        }
        break;
      default:
    }

  }









  render() {
    const { user, error } = this.state;
    return (
        <div className="wrapper">
          <div className="form-wrapper">
            <div className="details">
              <h2 className="head"> Fill in the Details</h2>
              <form className="row" onSubmit={this.handleSubmit}  noValidate>
                <div className="column">
                  <div className="input-group">
                    <label htmlFor="FullName">Full Name:</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        name="fullName"
                        value={user.fullName}
                        onChange={this.handleChange}
                        className={ `${error.fullName}`}
                    />
                  </div>
                  <span className="error-message">{error.fullName}</span>

                  <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="JohnDoe@gmail.com"
                        name="email"
                        className={ `${error.email}`}
                        onChange={this.handleChange}
                    />
                  </div>

                  <span className="error-message">{error.email}</span>

                  <div className="input-group">
                    <label htmlFor="number">Phone Number:</label>
                    <input
                        name="number"
                         maxLength="11"
                        value={user.number}
                        onChange={this.handleChange}
                        className={`${error.number}`}
                    />
                  </div>
                  <span className="error-message"> {error.number}</span>
                  <div className="input-group">
                    <label htmlFor="Password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={this.handleChange}
                        className={`${error.password}`}
                    />
                  </div>
                  <span className="error-message">{error.password}</span>
                  <div className="input-group">
                    <label htmlFor="password">Confirm Password:</label>
                    <input
                        type="password"
                        name="password"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="text"
                        name="date"
                        pattern="[0-9]{4}-[0-9]{2}"
                        placeholder="MM/YY"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="pin">PIN:</label>
                    <input
                        type="password"
                        name="pin"
                        maxLength="4"
                        value={user.pin}
                        className={ `${error.pin}`}
                        onChange={this.handleChange}
                    />
                  </div>
                  <span className="error-message">{error.pin}</span>
                  <div className="row">
                    <button id="submit" className="btn" disabled={!this.isValid}>Submit </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
