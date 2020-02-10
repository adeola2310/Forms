import React from 'react';
import $ from "jquery";
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
             number: 'number is invalid and must start with Nigerian number eg 080,070,090'
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
             password: 'password must contain At least 1 uppercase character,1 number, 1 special character and not shorter than 6 characters'
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
        // <div className="wrapper">
        //   <div className="form-wrapper">
        //     <div className="details">
        //       <h2 className="head"> Fill in the Details</h2>
        //       <form className="row" onSubmit={this.handleSubmit}  noValidate>
        //         <div className="column">
        //           <div className="input-group">
        //             <label htmlFor="FullName">Full Name:</label>
        //             <input
        //                 type="text" required=""
        //                 placeholder="John Doe"
        //                 name="fullName"
        //                 value={user.fullName}
        //                 onChange={this.handleChange}
        //                 className={ `${error.fullName}`}
        //             />
        //           </div>
        //           <span className="error-message">{error.fullName}</span>
        //
        //           <div className="input-group">
        //             <label htmlFor="email">Email:</label>
        //             <input
        //                 type="email"
        //                 placeholder="JohnDoe@gmail.com"
        //                 name="email"
        //                 className={ `${error.email}`}
        //                 onChange={this.handleChange}
        //             />
        //           </div>
        //
        //           <span className="error-message">{error.email}</span>
        //
        //           <div className="input-group">
        //             <label htmlFor="number">Phone Number:</label>
        //             <input
        //                 name="number"
        //                 type="number"
        //                 maxLength="10"
        //                 value={user.number}
        //                 onChange={this.handleChange}
        //                 className={`${error.number}`}
        //             />
        //           </div>
        //           <span className="error-message"> {error.number}</span>
        //           <div className="input-group">
        //             <label htmlFor="Password">Password:</label>
        //             <input
        //                 type="password"
        //                 name="password"
        //                 value={user.password}
        //                 onChange={this.handleChange}
        //                 className={`${error.password}`}
        //             />
        //           </div>
        //           <span className="error-message">{error.password}</span>
        //           <div className="input-group">
        //             <label htmlFor="confirmPassword">Confirm Password:</label>
        //             <input
        //                 type="password"
        //                 name="confirmPassword"
        //                 value={user.confirmPassword}
        //                 onChange={this.handleChange}
        //                 className={`${error.confirmPassword}`}
        //             />
        //           </div>
        //           <span className="error-message">{error.confirmPassword}</span>
        //           <div className="input-group">
        //             <label htmlFor="cardNumber">Card Number:</label>
        //             <input
        //                 type="number"
        //                 value={user.cardNumber}
        //                 onChange={this.handleChange}
        //                 className={`${error.cardNumber}`}
        //                 name="cardNumber"
        //                 placeholder="XXXX XXXX XXXX XXXX"
        //             />
        //           </div>
        //           <span className="error-message">{error.cardNumber}</span>
        //           <div className="input-group">
        //             <label htmlFor="date">Date:</label>
        //             <input
        //                 name="date"
        //                 id="date"
        //                 type="text"
        //                 value={user.date}
        //                   onChange={this.handleChange}
        //                 className={`${error.date}`}
        //                 placeholder="MM/YY"
        //             />
        //           </div>
        //           <span className="error-message">{error.password}</span>
        //           <div className="input-group">
        //             <label htmlFor="pin">PIN:</label>
        //             <input
        //                 type="password"
        //                 name="pin"
        //                 maxLength="4"
        //                 value={user.pin}
        //                 className={ `${error.pin}`}
        //                 onChange={this.handleChange}
        //             />
        //           </div>
        //           <span className="error-message">{error.pin}</span>
        //           <div className="row">
        //             <button id="submit" className="btn" disabled={!this.isValid}>Submit </button>
        //           </div>
        //         </div>
        /*      </form>*/
        /*    </div>*/
        /*  </div>*/
        /*</div>*/

        <div className="container">
          <div className="all-container">
            <div id="Column">
              <h2>Fill the Card Details</h2>
              <form id="signupSection" onSubmit={this.handleSubmit}>
                <div id="inputDivFirstName" className="inputDiv">
                  <input id="inputFieldFirstName"
                         className={` ${error.fullName}`}
                         type="text"
                         name="fullName"
                         placeholder="Full Name"
                         onChange={this.handleChange}
                  />
                </div>
                <span className="error-message">{error.fullName}</span>
                <div id="inputDivEmail" className="inputDiv">
                            <input
                                  type="email"
                                  placeholder="JohnDoe@gmail.com"
                                  name="email"
                                  className={ `${error.email}`}
                                  onChange={this.handleChange}
                              />
                </div>
                <span className="error-message">{error.email}</span>
                <div id="inputDivPhone" className="inputDiv" data-fieldname="Password">
                  <input id="inputDivPhone"
                         className={ `${error.number}`}
                         type="number"
                         placeholder="+234"
                         name="number"
                         onChange={this.handleChange}
                  />
                </div>
                <span className="error-message">{error.number}</span>
                <div id="inputDivPassword" className="inputDiv">
                  <input id="inputFieldPassword"
                         className={`${error.password}`}
                         type="password"
                         placeholder="Password"
                         name="password"
                         onChange={this.handleChange}
                  />
                </div>
                <span className="error-message">{error.password}</span>
                <div id="inputDivPassword" className="inputDiv">
                  <input id="inputFieldPassword"
                         className={`${error.confirmPassword}`}
                         type="password"
                         name="confirmPassword"
                         onChange={this.handleChange}
                         placeholder="Confirm Password"/>
                </div>
                <span className="error-message">{error.confirmPassword}</span>
                <div id="inputDivDate" className="inputDiv">
                  <input id="date"
                         className={`${error.date}`}
                         type="text"
                         name="date"
                         onChange={this.handleChange}
                         placeholder="MM/YY"/>
                </div>
                <div id="inputDivDate" className="inputDiv">
                  <input id="date"
                         className={`${error.cardNumber}`}
                         type="text"
                         name="cardNumber"
                         onChange={this.handleChange}
                         placeholder="XXXX XXXX XXXX XXXX"/>
                </div>
                <span className="error-message">{error.cardNumber}</span>
                <div id="inputDivDate" className="inputDiv">
                  <input
                         className={`${error.pin}`}
                         maxLength="4"
                         type="password"
                         name="pin"
                         onChange={this.handleChange}
                         placeholder="PIN"
                        />
                </div>
                <span className="error-message">{error.pin}</span>
                <button id="CTAButton">
                  SUBMIT
                </button>

              </form>
            </div>
          </div>

        </div>

    );
  }
}

export default App;
