import React, {useEffect, useState} from "react";
import {auth, googleAuthProvider} from "../../firebase";

import {toast} from "react-toastify";

import {Button} from "antd";
import loadingGif from "../../image/loading.gif"
import {
    GoogleOutlined,
    MailOutlined
} from "@ant-design/icons";

import {useDispatch, useSelector} from "react-redux";

import "react-toastify/dist/ReactToastify.css"

import {Link} from "react-router-dom";


const Login = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch()

    // start route redirect
    const {user} = useSelector((state) => ({...state}));
    useEffect(() => {

        if (user && user.token) history.push('/')
    }, [user])
    // end route redirect

    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.table(email, password)

        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            console.log(result);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')
        } catch (error) {

            console.log(error)
            toast.error(error.message)
            setLoading(false)

        }
    }
    const googleLogin = async () => {

        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {

                const {user} = result
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    }
                })
                history.push('/')

            })
            .catch(err => {
                console.log(err)
                toast.error(err.message)
            })
    }

    const loginForm = () => (
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
            <div className="form-group">
                <input type="password" className="form-control"
                       id="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Your password"
                />
            </div>
            <br/>

            <Button onClick={handleSubmit}
                    type="primary"
                    className="mb-3"
                    block
                    shape="round"
                    icon={<MailOutlined/>}
                    size="large"
                    disabled={!email || password.length < 6}
            > Login with Email/password</Button>
        </form>
    );

    return (

        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<img src={loadingGif} width="30px" height="30px" alt="loading..."/>) : (<h4>Login</h4>)}
                    {loginForm()}

                    <Button onClick={googleLogin}
                            type="danger"
                            className="mb-3"
                            block
                            shape="round"
                            icon={<GoogleOutlined/>}
                            size="large"
                    > Login with Google</Button>

                    <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;