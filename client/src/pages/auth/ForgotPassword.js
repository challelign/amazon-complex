import React, {useState, useEffect} from "react";
import {auth, googleAuthProvider} from "../../firebase";

import {toast} from "react-toastify";

import {Button} from "antd";
import loadingGif from "../../image/loading.gif"
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";

import {useDispatch, useSelector} from "react-redux";

import "react-toastify/dist/ReactToastify.css"

import {Link} from "react-router-dom";

const ForgetPassword = ({history}) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        setLoading(true)
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {

                setEmail('')
                setLoading(false)
                toast.success("Check Your email for password reset link ")

            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.message)
                console.log("Error MSG in forgot password", error)
                setEmail('')
            })

    }

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (<img src={loadingGif} width="30px" height="30px" alt="loading..."/>) : (
                <h4>Forgot Password</h4>)}


            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control"
                           id="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Your email"
                           autoFocus
                    />
                </div>

                <Button onClick={handleSubmit}
                    type="primary"
                    className="mb-3"
                    block
                    shape="round"
                    size="large"
                    disabled={!email}
                > Submit</Button>
            </form>
        </div>
    )
}


export default ForgetPassword