import React, {useState, useEffect} from "react";
import {auth} from "../../firebase";

import {toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css"

const RegisterComplete = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {

        // console.log("Saved Email From Local Storage-- --> ", window.localStorage.getItem('emailForRegistration'))
        setEmail(window.localStorage.getItem('emailForRegistration'));
        console.log("Href url location --->", window.location.href)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Email and Password is required")
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 chars long")
            return;
        }


        try {

            const result = await auth.signInWithEmailLink(email, window.location.href);
            console.log(result)

            if (result.user.emailVerified) {
                //    remove user email from the local storage

                window.localStorage.removeItem('emailForRegistration')

                //  get user id token

                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult()

                //    redux store

                console.log('user ', user, 'idTokenResult', idTokenResult)
                //    redirect

                history.push('/')

            }


        } catch (error) {

            console.log(error)
            toast.error(error.message)
        }


    }

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
                   id="email"
                   value={email}
                   disabled
            />
            <br/>

            <input type="password" className="form-control"
                   id="password"
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="Enter Your Password"
                   autoFocus

            />
            <br/>
            <button type="submit" className="btn btn-raised pt-2">Complete Registration</button>
        </form>
    );

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4> Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;
