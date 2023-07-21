import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }
    

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onSubmitRegister = () => {
      fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail, 
                password: this.state.registerPassword, 
                name: this.state.registerName
            }) 
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange("signin")
            }   
        })
    }
    


    render() {
        return (
            <article className="br3 ba b--white-30 mv2 w-100 w-100-m w-50-l mw6 center shadow-5">
                <main className="pa4 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="center f1 fw6 ph0 mh0">Register</legend>
                        <div className="ma1">
                            <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                            <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                        </div>
                        <div className="ma1">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="ma1">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="center ma4">
                            <input onClick={this.onSubmitRegister} className="white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="Submit" />
                        </div>            
                    </div>
                </main>
            </article>
        )
    }

};

export default Register;
