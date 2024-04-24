//import Validation from "../helpers/LoginValidation.js";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

import "./Authentication.css"


// eslint-disable-next-line react/prop-types
function Login() {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: false,
        password: false
    });

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("https://api.datavortex.nl/kamonlinenovi/users/authenticate", {
                    username: `${values.username}`,
                    password: `${values.password}`,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'kamonlinenovi:rv8l37E54HZfMeCdH9VT'
                    }
                });
            if (response.status === 200) {
                console.log("Gebruiker is ingelogd");
                login(response.data.jwt);
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors({ username: true });
            }
            if (error.response && error.response.status === 401) {
                setErrors({ password: true });
            }
            else {
                console.error(error);
            }
        }
    }

    return (
        <>
            <main className="outer-container">
                <section className="inner-container login">
                    <div className="header--title"><NavLink to="/"><h1>KAM Online</h1></NavLink></div>
                    <form action="" onSubmit={handleSubmit}>
                        {/*Username input*/}
                        <div className="form-outline mb-4">
                            <input type="text" name="username" id="username" onChange={handleInput}
                                   className={`form-control username ${errors.username && 'danger'}`}  required/>
                            <label className="form-label" form="username"
                                   style={{display: values.username ? 'none' : 'block'}}>Gebruikersnaam</label>
                            {errors.username && <span className="text-danger">Gebruikersnaam onbekend</span>}
                        </div>

                        {/*Password input*/}
                        <div className="form-outline mb-4">
                            <input type="password" name="password" id="loginPassword" onChange={handleInput}
                                   className={`form-control ${errors.password && 'danger'}`} required/>
                            <label className="form-label" form="loginPassword"
                                   style={{display: values.password ? 'none' : 'block'}}>Wachtwoord</label>
                            {errors.password && <span className="text-danger">Onjuist wachtwoord</span>}
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                {/*Simple link*/}
                                <span>Wachtwoord vergeten?</span>
                            </div>
                        </div>

                        {/*Submit button*/}
                        <button type="submit" className="btn btn-primary btn-block mb-4">Inloggen</button>

                        {/*Register buttons*/}
                        <div className="text-center">
                            <p>Geen account? <span className="btn btn-primary"><NavLink
                                to="/register">Registreer</NavLink></span>
                            </p>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Login;