import React, {Component} from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <p>lkmn</p>
                <div className="phone">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                      type="number"
                      name="phone"
                      id=""
                      formNoValidate
                  />
                </div>
                <div className="confirm-password">
                  <label htmlFor="">Confirm Password:</label>
                  <input
                      type="password"
                      name="confirmPassword"
                      id=""
                      formNoValidate
                  />
                </div>
                <div className="card-number">
                  <label htmlFor="">Card Number:</label>
                  <input
                      name="cardNumber"
                      id=""
                      formNoValidate
                  />
                </div>
                <div className="date">
                  <label htmlFor="date">Expiration Date:</label>
                  <input
                      name="date"
                      id=""
                      formNoValidate
                  />
                </div>
                <div className="pin">
                  <label htmlFor="pin">PIN:</label>
                  <input
                      name="pin"
                      id=""
                      formNoValidate
                  />
                </div>

                <div className="submit">
                    <button className="btn"> Submit</button>
                </div>
            </div>
        );
    }
}

export default Dashboard;
