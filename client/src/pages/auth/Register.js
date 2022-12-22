import React, {useState} from "react";

const Register = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = () => {

    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control"
                   id="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   autoFocus
            />
            <button type="submit" className="btn btn-raised pt-2">Register</button>
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
