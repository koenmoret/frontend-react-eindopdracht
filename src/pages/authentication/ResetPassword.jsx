import {NavLink} from "react-router-dom";
import {checkPasswordValidity} from "../../helper/checkPasswordValidity.js";
import {useState} from "react";

import "./Authentication.css"

function ResetPassword() {


    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [label, setLabel] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
        passwordValidation: false
    });

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
        setErrors({ confirmPassword: false });

        if (event.target.value === "") {
            setLabel(prev => ({...prev, [event.target.name]: false}));
        } else {
            setLabel(prev => ({...prev, [event.target.name]: true}));
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(values.password + " " + values.confirmPassword);
        if (!values.username) {
            setErrors({ username: true });
        }
        if (values.password !== values.confirmPassword) {
            setErrors({ confirmPassword: true });
        } else if (!values.password ) {
            setErrors({ password: true });
        }
        else if (!checkPasswordValidity(values.password)) {
            setErrors({ passwordValidation: true });
        }
        else {
            // try {
            //     const response = await axios.put("https://api.datavortex.nl/kamonlinenovi/users/koen6/", {
            //             username: `koen6`,
            //             password: `12345678`
            //         },
            //         {
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'X-Api-Key': 'kamonlinenovi:rv8l37E54HZfMeCdH9VT'
            //             }
            //         });
            //     if (response.status === 200) {
            //         console.log("Wachtwoord gewijzigd");
            //         return { status: response.status };
            //     }
            // } catch (error) {
            //
            //     if (error.response && error.response.status === 400) {
            //         //console.error(error);
            //         return { status: error.response.status};
            //     }
            //     else if (error.response && error.response.status === 401) {
            //         //console.error(error);
            //         return { status: error.response.status };
            //     } else {
            //         // console.error(error);
            //         return { error: "Er is een fout opgetreden bij het wijzigen" };
            //     }
            // }
        }
    }

    return (
        <>
            <main className="outer-container">
                <section className="inner-container login">
                    <div className="header--title"><NavLink to="/"><h1>KAM Online</h1></NavLink></div>
                    <form action="" onSubmit={handleSubmit}>
                        {/*Email input*/}
                        <div className="form-outline mb-4">
                            <input type="text"
                                   name="username"
                                   id="username"
                                   className={`form-control ${errors.username && 'danger'}`}
                                   onChange={handleInput}
                            />
                            <label className={`form-label ${label.username && 'active'}`} form="email">Gebruikersnaam</label>
                            {errors.username && <span className="text-danger">Emailadres bestaat al</span>}
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
                        {/*Password input*/}
                        <div className="form-outline mb-4">
                            <input type="password"
                                   name="confirmPassword"
                                   id="confirmPassword"
                                   className={`form-control ${errors.confirmPassword && 'danger'}`}
                                   onChange={handleInput}
                            />
                            <label className={`form-label ${label.confirmPassword && 'active'}`}
                                   form="password">Wachtwoord</label>
                            {errors.password && <span className="text-danger">Wachtwoord ontbreekt</span>}
                            {errors.passwordValidation && <span className="text-danger">Gebruik tenminste 8 tekens (tenminste één hoofdletter, kleine letter, cijfer en speciale teken)</span>}
                        </div>

                        {/*Submit button*/}
                        <button type="submit" className="btn btn-primary btn-block mb-4">Reset wachtwoord</button>

                        {/*Register buttons*/}
                        <div className="text-center">
                            <p>Al een account? <span className="btn btn-primary"><NavLink to="/login">Inloggen</NavLink></span>
                            </p>
                        </div>
                    </form>
                </section>
            </main>
            <modal><p>Helaas is deze optie niet mogelijk in verband met de beperkingen van Novi backend en mail mogelijkheden.</p></modal>
        </>)
}

export default ResetPassword;