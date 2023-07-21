import React, { Component } from 'react';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state= {
            signInEmail: '',
            signInPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }


    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.signInEmail, password: this.state.signInPassword}) 
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange("home")
            }
        })
    }
    

    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--white-30 mv2 w-100 w-100-m w-50-l mw6 center shadow-5">
                <main className="pa4 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="center f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="ma3">
                            <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="ma3">
                            <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="center ma2">
                            <input onClick={this.onSubmitSignIn} className="white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f4 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="center lh-copy ma1 pointer">
                            <p onClick={() => onRouteChange("register")} className="white ph2 pa1 f5 link dim black db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin
