import React from "react";

const Register = ({onRouteChange}) => {
    return (
    <article className="br3 ba b--white-30 mv2 w-100 w-100-m w-50-l mw6 center shadow-5">
        <main className="pa4 white-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="center f1 fw6 ph0 mh0">Info</legend>
                <div className="ma1">
                    <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                </div>
                <div className="ma1">
                    <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="ma1">
                    <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
                </fieldset>
                <div className="center ma4">
                    <input onClick={() =>onRouteChange("signin")} className="white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                </div>            
            </div>
        </main>
    </article>
    )
};

export default Register;
