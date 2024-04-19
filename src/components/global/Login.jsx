
//import Validation from "../helpers/LoginValidation.js";
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";



// eslint-disable-next-line react/prop-types
function Login({isLoginFormOpen, setLoginFormOpen}) {

    const { login } = useContext(AuthContext);

    const [values, setValues] = useState({
        email: "",
        password: ""
    });


    const [errors, setErrors] = useState("");


    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //const err = Validation(values);
        //setErrors(err);

        //if (err.email === "" && err.password === "") {
        try {
            const response = await axios.post("https://api.datavortex.nl/kamonlinenovi/users/authenticate",{
                  username: "koen",
                  password: "12345678",
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
            }
        } catch (e) {
            console.error(e);
        }
        // }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                {/*Email input*/}
                <div className="form-outline mb-4">
                    <input type="email" name="email" id="loginEmail" onChange={handleInput}
                           className="form-control email" required/>
                    <label className="form-label" form="loginEmail" style={{display: values.email ? 'none' : 'block'}}>Email
                        adres</label>
                    {errors.email && <span className="text-danger"> {errors.email}</span>}
                </div>

                {/*Password input*/}
                <div className="form-outline mb-4">
                    <input type="password" name="password" id="loginPassword" onChange={handleInput}
                           className="form-control" required/>
                    <label className="form-label" form="loginPassword"
                           style={{display: values.password ? 'none' : 'block'}}>Wachtwoord</label>
                    {errors.password && <span className="text-danger"> {errors.password}</span>}
                </div>

                {/*2 column grid layout for inline styling*/}
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        {/*Checkbox*/}
                        {/*<div className="form-check">*/}
                        {/*    <input className="form-check-input" type="checkbox" value="" id="form2Example3" checked />*/}
                        {/*    <label className="form-check-label" form="form2Example3"> Onthoud mij </label>*/}
                        {/*</div>*/}
                    </div>

                    <div className="col">
                        {/*Simple link*/}
                        <span>Wachtwoord vergeten?</span>
                    </div>
                </div>

                {/*Submit button*/}
                <button type="submit" className="btn btn-primary btn-block mb-4">Inloggen</button>

                {/*Register buttons*/}
                <div className="text-center">
                    <p>Geen account? <span className="btn btn-primary"
                                           >Registreer</span>
                    </p>
                </div>
            </form>
        </>
    );
}

export default Login;