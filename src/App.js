import React from 'react';
import './App.css';
import {isOnlyText,
  isEmailValid,
  isGreaterThanTwo,
  isValid,
  isPassword,
  confirmPassword,
  isNumber,
    formatCardNumber
  } from "./validators/helpers";


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
       cardNumber:"",
       pin:""
     },
     error:{
       fullName: "",
       email: "",
       password: "",
       confirmPassword: "",
       date: "",
       number: "",
       cardNumber: "",
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
      case 'cardNumber':
        if ( value && !formatCardNumber(value)){
         this.setState(prevState => ({
           error: {
             ...prevState.error,
             cardNumber: 'card number is invalid'
           }
         }))
        }
        else{
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              cardNumber: ''
            }
          }))
        }
        break;
      case 'date':
        let date = document.getElementById('date');
      function checkValue(str, max) {
        if (str.charAt(0) !== '0' || str === '00') {
          let num = parseInt(str);
          if (isNaN(num) || num <= 0 || num > max) num = 1;
          str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
        };
        return str;
      };

        date.addEventListener('keydown', function(e) {
          this.type = 'text';
          let input = this.value;
          let key = e.keyCode || e.charCode;

          if (key == 8 || key == 46)    // here's where it checks if backspace or delete is being pressed
            return false;

          if (/\D\/$/.test(input)) input = input.substr(0, input.length - 1);
          let values = input.split('/').map(function(v) {
            return v.replace(/\D/g, '')
          });
          if (values[0]) values[0] = checkValue(values[0], 12);
          // if (values[1]) values[1] = checkValue(values[1], 31);
          let output = values.map(function(v, i) {
            return v.length == 2 && i < 2 ? v + '/' : v;
          });
          this.value = output.join('').substr(0, 4);
        });


        break;
      case 'password':
        if (value && !isPassword(value)){
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
        console.log("Password", this.state.user.password);
        console.log("value", value);
        if (!isPassword(value) || !confirmPassword(this.state.user.password, value)){
         this.setState(prevState => ({
           error: {
             ...prevState.error,
             confirmPassword: 'password does not match the above'
           }
         }))
        }
        else{
          this.setState(prevState => ({
            error: {
              ...prevState.error,
              confirmPassword: ''
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
                        type="number"
                        maxLength="10"
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
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={this.handleChange}
                        className={`${error.confirmPassword}`}
                    />
                  </div>
                  <span className="error-message">{error.confirmPassword}</span>
                  <div className="input-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input
                        type="number"
                        value={user.cardNumber}
                        onChange={this.handleChange}
                        className={`${error.cardNumber}`}
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                    />
                  </div>
                  <span className="error-message">{error.cardNumber}</span>
                  <div className="input-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        name="date"
                        id="date"
                        type="text"
                        value={user.date}
                          onChange={this.handleChange}
                        className={`${error.date}`}
                        placeholder="MM/YY"
                    />
                  </div>
                  <span className="error-message">{error.password}</span>
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
