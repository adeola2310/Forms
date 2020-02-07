import React from 'react';
import './App.css';

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const formValid = ({ formErrors, ...rest}) =>{
  let isValid = false;

  Object.values(formErrors).forEach(val => {
    if (val.length > 0){
      isValid = false
    }
    else {
      isValid = true
    }
  });

  Object.values(rest).forEach(val =>{
    if (val === null){
      isValid = false
    }
    else {
      isValid = true
    }
  });
  return isValid;
}

class App extends React.Component{

  constructor(props) {
    super(props);

    this.state ={
      fullName:"",
      email:"",
      password:"",
      formErrors:{
        fullName: '',
        email: '',
        password: ''
      }
    }
  }
  handleSubmit =(e)=>{
    e.preventDefault();
    if (formValid(this.state)){
      console.log(this.state)
    }
    else {
      console.log('form is invalid');
    }
  }

  formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "fullName":
        formErrors.fullName =
            value.length < 2 ? "At least 4 characaters required" : "";
        break;
      case "email":
        formErrors.email = regExp.test(value)
            ? ""
            : "Email address is invalid";
        break;
      case "password":
        formErrors.password =
            value.length < 6 ? "Atleast 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      [name]: value
    })
  };

  render() {
    const { formErrors } = this.state;
    return (
        <div className="wrapper">
          <div className="form-wrapper">
            <div className="details">
              <h2 className="head"> Fill in the Details</h2>
              <form className="row" onSubmit={this.handleSubmit} noValidate>
                <div className="column">
                  <div className="input-group">
                    <label htmlFor="FullName">Full Name:</label>
                    <input
                        type="text"
                        className={formErrors.fullName.length > 0 ? "is-valid form" : "form-control"}
                        placeholder="John Doe"
                        name="fullName"
                        onChange={this.formValChange}
                    />
                  </div>
                  {formErrors.fullName.length < 2 && (
                      <span className="text-danger" style={{color:"red"}}>Full name should be more than 2 characters</span>
                  )}

                  <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="JohnDoe@gmail.com"
                        name="email"
                        onChange={this.formValChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="number">Phone Number:</label>
                    <input
                        name="number"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="Password">Password:</label>
                    <input
                        type="password"
                        placeholder="John Doe"
                        name="password"
                        onChange={this.formValChange}
                    />
                  </div>
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
                        placeholder="MM/YY"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="pin">PIN:</label>
                    <input
                        type="text"
                        name="pin"
                        id=""
                    />
                  </div>
                  <div className="row">
                    <button id="submit" className="btn">Submit </button>
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
