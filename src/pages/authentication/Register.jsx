import {useContext, useState} from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import {checkPasswordValidity} from "../../helper/checkPasswordValidity.js";
import {checkAuthenticateValidity} from "../../helper/checkAuthenticateValidity.js";
import {AuthContext} from "../../context/AuthContext.jsx";


function Register() {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        confirmEmail: "",
        password: ""
    });

    const [label, setLabel] = useState({
        username: false,
        email: false,
        confirmEmail: false,
        password: false
    });

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        confirmEmail: false,
        password: false,
        passwordValidation: false
    });

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
        setErrors({ confirmEmail: false });

        if (event.target.value === "") {
            setLabel(prev => ({...prev, [event.target.name]: false}));
        } else {
            setLabel(prev => ({...prev, [event.target.name]: true}));
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(values.email + " " + values.confirmEmail);
        if (values.email !== values.confirmEmail) {
            setErrors({ confirmEmail: true });
        } else if (!values.password ) {
            setErrors({ password: true });
        }
        else if (!checkPasswordValidity(values.password)) {
            setErrors({ passwordValidation: true });
        }
        else {
            try {
                const response = await axios.post("https://api.datavortex.nl/kamonlinenovi/users", {
                    username: `${values.username}`,
                    email: `${values.email}`,
                    password: `${values.password}`,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': 'kamonlinenovi:rv8l37E54HZfMeCdH9VT'
                    }
                });
                if (response.status === 200) {
                    console.log("Gebruiker is geregistreerd");
                    checkAuthenticateValidity(values, login).then(validation => {
                        if (validation.status && validation.status === 200) {
                            // Als de validatie succesvol is, ga door met de volgende actie, bijv. doorverwijzen naar een andere pagina
                            navigate('/');
                        } else if (validation.status === 400) {
                            setErrors({username: true});
                        } else if (validation.status === 401) {
                            setErrors({password: true});
                        }
                    })
                        .catch(error => {
                            console.error("Er is een fout opgetreden bij het inloggen:", error);
                        });
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    const response = error.response;
                    if (response.data === "Username already exists in application kamonlinenovi") {
                        setErrors({username: true});
                    }
                    if (response.data === "Email already exists") {
                        setErrors({email: true});
                    }
                } else {
                    console.error(error);
                }
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
                            <input type="text"
                                   name="username"
                                   id="username"
                                   className={`form-control ${errors.username && 'danger'}`}
                                   onChange={handleInput}
                            />
                            <label className={`form-label ${label.username && 'active'}`}
                                   form="username">Gebruikersnaam</label>
                            {errors.username && <span className="text-danger">Gebruikersnaam bestaat al</span>}
                        </div>
                        {/*Email input*/}
                        <div className="form-outline mb-4">
                            <input type="email"
                                   name="email"
                                   id="email"
                                   className={`form-control ${errors.email || errors.confirmEmail && 'danger'}`}
                                   onChange={handleInput}
                            />
                            <label className={`form-label ${label.email && 'active'}`} form="email">Email
                                adres</label>
                            {errors.email && <span className="text-danger">Emailadres bestaat al</span>}
                        </div>

                        {/*Confirm Email input*/}
                        <div className="form-outline mb-4">
                            <input type="email"
                                   name="confirmEmail"
                                   id="confirmEmail"
                                   className={`form-control ${errors.confirmEmail && 'danger'}`}
                                   onChange={handleInput}
                            />
                            <label className={`form-label ${label.confirmEmail && 'active'}`} form="confirmEmail">Bevestig
                                email adres</label>
                            {errors.confirmEmail && <span className="text-danger">Emailadres is niet hetzelfde</span>}
                        </div>

                        {/*Password input*/}
                        <div className="form-outline mb-4">
                            <input type="password"
                                   name="password"
                                   id="password"
                                   className={`form-control ${errors.password && 'danger'}`}
                                   onChange={handleInput}
                            />
                            <label className={`form-label ${label.password && 'active'}`}
                                   form="password">Wachtwoord</label>
                            {errors.password && <span className="text-danger">Wachtwoord ontbreekt</span>}
                            {errors.passwordValidation && <span className="text-danger">Gebruik tenminste 8 tekens (tenminste één hoofdletter, kleine letter, cijfer en speciale teken)</span>}
                        </div>

                        {/*Submit button*/}
                        <button type="submit" className="btn btn-primary btn-block mb-4">Registreer</button>

                        {/*Register buttons*/}
                        <div className="text-center">
                            <p>Al een account? <span className="btn btn-primary"><NavLink to="/login">Inloggen</NavLink></span>
                            </p>
                        </div>
                    </form>
                </section>
            </main>
        </>)
}

export default Register;