import React, {useState} from "react";
import {auth} from "../../firebase";

import {toast} from "react-toastify";

import "react-toastify/dist/ReactToastify.css"
import {Button} from "antd";
import {MailOutlined} from "@ant-design/icons";

const Register = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            toast.error("Email and Password is required")
            return;
        }

        try {
            console.log("ENV ----< ", process.env.REACT_APP_REGISTER_REDIRECT_URL)

            const config = {
                url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
                handleCodeInApp: true
            }

            await auth.sendSignInLinkToEmail(email, config)


            toast.success(
                `Email is sent to ${email} . Click the link to complete your registration`
            )
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }


        //    save user email to local storage
        window.localStorage.setItem('emailForRegistration', email)

        //clear state
        setEmail("")
    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
                   id="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Your email"
                   autoFocus
            />
            <br/>

            <Button onClick={handleSubmit}
                    type="primary"
                    className="mb-3"
                    block
                    shape="round"
                    size="large"
                    disabled={!email}
            > Register</Button>
        </form>
    );

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
