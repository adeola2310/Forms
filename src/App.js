import React from 'react';
import './App.css';
 import {Formik} from "formik";
 import * as EmailValidator from 'email-validator';


class App extends React.Component {





  render() {
    return (
        <div>
          <Formik initialValues={{ fullname: '', email:''}}
                  onSubmit={(values, {setSubmitting}) =>{
                      console.log('submitting', values);
                      setSubmitting(false);
                  }}
                  validate= {values => {
                      let errors = {};
                      if ( !values.fullname){
                          errors.fullname = "Required";
                      }
                      else if (!values.fullname.length < 2){
                         errors.fullname = " full name must be more than to characters"
                      }

                      if (!values.email){
                         errors.email ="Required"
                      }
                      else if (!EmailValidator.validate(values.email)){
                          errors.email = "invalid email address";
                      }
                  }

                  }
          >

              {props =>{
                 const {values,touched,errors,isSubmitting,handleChange,handleBlur,handleSubmit} = props;
              return (
                  <div className="wrapper">
                      <form className="form-wrapper" onSubmit={this.handleSubmit} >
                      <label htmlFor="fullname">Full Name:</label>
                          <input
                          name="fullname"
                          type="text"
                          placeholder="Enter full name"
                          value={values.fullname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={errors.fullname && touched.fullname && "error"}
                          />
                          {errors.fullname && touched.fullname && (
                              <div className="error-message">{errors.fullname}</div>
                          )}
                          <label htmlFor="email">Email</label>
                          <input
                          type="email"
                          name="email"
                          placeholder="johndoe@gmail.com"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className={errors.email && touched.email && "error"}
                          />
                          {errors.email && touched.email}
                          <button type="submit" className="btn" disabled={isSubmitting}>
                              Login
                          </button>
                      </form>
                  </div>

              )
              }};

          </Formik>
        </div>
    );
  }
}

export default App;
