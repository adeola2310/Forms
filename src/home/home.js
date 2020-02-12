import React from 'react';
import './home.css';
import {
    isOnlyText,
    isEmailValid,
    isGreaterThanTwo,
    isValid,
    isPassword,
    confirmPassword,
    isNumber,
    isOnlyNumber,
} from "./../validators/helpers";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            user: {
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                date: "",
                number: "",
                cardNumber: "",
                pin: ""
            },
            error: {
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                date: "",
                number: "",
                cardNumber: "",
                pin: ""
            }
        }


    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/dashboard');
    }
    handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        this.setState(prevState => ({
            user: {
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
                if (!isEmailValid(value)) {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            email: 'email is invalid'
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            email: ''
                        }
                    }))
                }
                break;
            case 'number':
                if (!isNumber(value) && value) {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            number: 'number must be an 11 digits starting with 080,070,090'
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            number: ''
                        }
                    }))
                }
                break;
            case 'cardNumber':
                let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

                if (!isOnlyNumber(v) || v === '') {
                    console.log('here')
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            cardNumber: 'card number must be a 16 digits number'
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            cardNumber: ''
                        }
                    }))
                }

                let matches = v.match(/\d{4,16}/g);
                let match = ((matches && matches[0]) || '');
                let parts = []
                for (let i = 0, len = match.length; i < len; i += 4) {
                    parts.push(match.substring(i, i + 4))
                }
                if (parts.length) {
                    this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            cardNumber: parts.join(' ')
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        user: {
                            ...prevState.user,
                            cardNumber: value
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
                    str = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
                }
                ;
                return str;
            };

                date.addEventListener('keydown', function (e) {
                    this.type = 'text';
                    let input = this.value;
                    let key = e.keyCode || e.charCode;

                    if (key === 8 || key === 46)    // here's where it checks if backspace or delete is being pressed
                        return false;

                    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 1);
                    let values = input.split('/').map(function (v) {
                        return v.replace(/\D/g, '')
                    });
                    if (values[0]) values[0] = checkValue(values[0], 12);
                    // if (values[1]) values[1] = checkValue(values[1], 31);
                    let output = values.map(function (v, i) {
                        return v.length === 2 && i < 2 ? v + '/' : v;
                    });
                    this.value = output.join('').substr(0, 4);
                });
                break;
            case 'password':
                if (value && !isPassword(value)) {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            password: 'password must contain At least 1 uppercase character,1 number, 1 special character and not shorter than 6 characters'
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            password: ''
                        }
                    }))
                }
                break;
            case 'confirmPassword':
                if (!isPassword(value) || !confirmPassword(this.state.user.password, value)) {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            confirmPassword: 'password does not match the one above'
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            confirmPassword: ''
                        }
                    }))
                }
                break;
            case  'pin':
                if (!isValid(value) && value) {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            pin: 'pin must be a number and must not be less than or greater than 4'
                        }
                    }))
                } else {
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
        if (!this.state.error.fullName &&
            !this.state.error.email &&
            !this.state.error.password &&
            !this.state.error.confirmPassword &&
            !this.state.error.date &&
            !this.state.error.number &&
            !this.state.error.cardNumber &&
            !this.state.error.pin &&
            this.state.user.fullName && this.state.user.email && this.state.user.cardNumber && this.state.user.pin && this.state.user.password && this.state.user.confirmPassword && this.state.user.date && this.state.user.number) {
            this.setState({isValid: true});
        } else {

            this.setState({isValid: false});
        }
    }


    render() {
        const {user, error} = this.state;
        return (
            <div className="container">
                <div className="all-container">
                    <div id="Column">
                        <h2>Fill the Card Details</h2>
                        <form id="signupSection" onSubmit={this.handleSubmit.bind(this)}>
                            <label>Name:</label>
                            <div id="fullName" className="inputDiv">
                                <input id="fullName"
                                       className={` ${error.fullName}`}
                                       type="text"
                                       name="fullName"
                                       value={user.fullName}
                                       placeholder="John Doe"
                                       onChange={this.handleChange}
                                />
                            </div>
                            <span className="error-message">{error.fullName}</span>
                            <div id="email" className="inputDiv">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="JohnDoe@gmail.com"
                                    name="email"
                                    value={user.email}
                                    className={`${error.email}`}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <span className="error-message">{error.email}</span>
                            <div id="phone" className="inputDiv">
                                <label>Phone Number:</label>
                                <input id="phone"
                                       className={`${error.number}`}
                                       type="number"
                                       placeholder="e.g 08131902727"
                                       value={user.number}
                                       name="number"
                                       onChange={this.handleChange}
                                />
                            </div>
                            <span className="error-message">{error.number}</span>
                            <div id="password" className="inputDiv">
                                <label>Password:</label>
                                <input id="password"
                                       className={`${error.password}`}
                                       type="password"
                                       placeholder="Password"
                                       value={user.password}
                                       name="password"
                                       onChange={this.handleChange}
                                />
                            </div>
                            <span className="error-message">{error.password}</span>
                            <div id="confirmPassword" className="inputDiv">
                                <label>Confirm Password:</label>
                                <input id="confirmPassword"
                                       className={`${error.confirmPassword}`}
                                       type="password"
                                       value={user.confirmPassword}
                                       name="confirmPassword"
                                       onChange={this.handleChange}
                                       placeholder="Confirm Password"
                                />
                            </div>
                            <span className="error-message">{error.confirmPassword}</span>
                            <div className="inputDiv">
                                <label>Expiring Date:</label>
                                <input id="date"
                                       className={`${error.date}`}
                                       type="number"
                                       name="date"
                                       value={user.date}
                                       onChange={this.handleChange}
                                       placeholder="MM/YY"/>
                            </div>
                            <div className="inputDiv">
                                <label>Card Number:</label>
                                <input id="cc"
                                       className={`${error.cardNumber}`}
                                       type="text"
                                       name="cardNumber"
                                       value={user.cardNumber}
                                       onChange={this.handleChange}
                                       placeholder="XXXX XXXX XXXX XXXX"/>
                            </div>
                            <span className="error-message">{error.cardNumber}</span>
                            <div id="pin" className="inputDiv">
                                <label>Pin Number:</label>
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

                            <button type="submit" id="submit-button"
                                    disabled={!this.state.isValid}
                            >
                                SUBMIT
                            </button>

                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

export default Home;
