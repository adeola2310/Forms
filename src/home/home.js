import React from 'react';
import './home.css';
import {
    withRouter
} from 'react-router-dom';
import {
    isFullName,
    isEmailValid,
    isGreaterThanTwo,
    isValid,
    isPassword,
    isCardNumber,
    confirmPassword,
    isNumber,
    isOnlyNumber,

} from "./../validators/helpers";


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
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
        };
        console.log("initial state", this.state)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/dashboard');
    };

    handleChange = async (e) => {
        e.preventDefault();
        const {name, value} = e.target;

        await this.setState(prevState => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));


        // this.setState(prevState => ({
        //     error: {
        //         ...prevState.error,
        //         [name]: value
        //     }
        // }));

        switch (name) {
            case 'fullName':
                if ((!isFullName(value) && value) || !isGreaterThanTwo(value)) {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            fullName: 'Name must have more than 2 characters with both First and Last name'
                        }
                    }));
                } else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            fullName: ''
                        }

                    }));

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
                let numberValue = value.substr(0, 11);

                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        number: numberValue
                    }
                }));

                if (!isNumber(numberValue) && numberValue) {
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
                    }));
                }
                break;
            case 'cardNumber':
                let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

                if (!isOnlyNumber(v) || v === '') {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            cardNumber: 'error'
                        }
                    }))

                } else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.error,
                            cardNumber: ''
                        }
                    }));
                }

                let matches = v.match(/\d{4,16}/g);
                let match = matches && matches[0] || '';
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
                    }));
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
                        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
                    }
                    return str;
                }

                date.addEventListener('keydown', function (e) {
                    this.type = 'text';
                    let input = this.value;
                    let key = e.keyCode || e.charCode;

                    if (key == 8 || key == 46)    // here's where it checks if backspace or delete is being pressed
                        return false;

                    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 1);
                    let values = input.split('/').map(function (v) {
                        return v.replace(/\D/g, '')
                    });
                    if (values[0]) values[0] = checkValue(values[0], 12);
                    // if (values[1]) values[1] = checkValue(values[1], 31);
                    let output = values.map(function (v, i) {
                        return v.length == 2 && i < 2 ? v + '/' : v;
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
                            confirmPassword: 'password does not match the above'
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
                if (!isValid(value)) {
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
            this.state.user.fullName &&
            this.state.user.email &&
            this.state.user.password &&
            this.state.user.confirmPassword &&
            this.state.user.date &&
            this.state.user.number &&
            this.state.user.cardNumber &&
            this.state.user.pin
        ) {
            this.setState({isSubmit: true});
        } else {
            this.setState({isSubmit: false});
        }
    }


    render() {
        const {user, error} = this.state;
        return (
            <div className="container">
                <div className="all-container">
                    <div id="Column">
                        <h2>Fill the Card Details</h2>
                        <form id="signupSection" onSubmit={this.handleSubmit}>

                            <div id="fullName" className="inputDiv">
                                <input id="fullName"
                                       type="text"
                                       name="fullName"
                                       value={user.fullName}
                                       placeholder="Full Name"
                                       onChange={this.handleChange}

                                />
                            </div>
                            <span className="error-message">{error.fullName}</span>
                            <div id="email" className="inputDiv">
                                <input
                                    type="email"
                                    placeholder="JohnDoe@gmail.com"
                                    name="email"
                                    value={user.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <span className="error-message">{error.email}</span>
                            <div id="phone" className="inputDiv">
                                <input id="phone"
                                       type="number"
                                       placeholder="e.g 08131902727"
                                       value={user.number}
                                       name="number"
                                       onChange={this.handleChange}
                                       maxLength="11"
                                />
                            </div>
                            <span className="error-message">{error.number}</span>
                            <div id="password" className="inputDiv">
                                <input id="password"
                                       type="password"
                                       placeholder="Password"
                                       value={user.password}
                                       name="password"
                                       onChange={this.handleChange}
                                />
                            </div>
                            <span className="error-message">{error.password}</span>
                            <div id="confirmPassword" className="inputDiv">
                                <input id="confirmPassword"
                                       type="password"
                                       value={user.confirmPassword}
                                       name="confirmPassword"
                                       onChange={this.handleChange}
                                       placeholder="Confirm Password"
                                />
                            </div>
                            <span className="error-message">{error.confirmPassword}</span>
                            <div className="inputDiv">
                                <input id="date"
                                       type="number"
                                       name="date"
                                       value={user.date}
                                       onChange={this.handleChange}
                                       placeholder="MM/YY"/>
                            </div>
                            <div className="inputDiv">
                                <input id="cc"
                                       type="text"
                                       name="cardNumber"
                                       value={user.cardNumber}
                                       onChange={this.handleChange}
                                       placeholder="XXXX XXXX XXXX XXXX"/>
                            </div>
                            <span className="error-message">{error.cardNumber}</span>
                            <div id="pin" className="inputDiv">
                                <input
                                    maxLength="4"
                                    type="password"
                                    name="pin"
                                    onChange={this.handleChange}
                                    placeholder="PIN"
                                    value={user.pin}
                                />
                            </div>
                            <span className="error-message">{error.pin}</span>

                            <button type="submit" id="submit-button"
                                    disabled={!this.state.isSubmit}
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
