import {useState} from "react";
import axios from "axios";

function Register({isLoginFormOpen, setLoginFormOpen}) {

    const [values, setValues] = useState({
        username: "koen",
        email: "kvmoret.ica@gmail.com",
        confirmEmail: "",
        password: "12345678"
    });

    const [errors, setErrors] = useState("");

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        //const err = Validation(values);
        //setErrors(err);
        //if (err.fullName === "" && err.registerEmail === "" && err.registerPassword === "") {

        try {
            const response = await axios.post("https://api.datavortex.nl/kamonlinenovi/users", {
                username: values.username,
                email: values.email,
                password: values.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'kamonlinenovi:rv8l37E54HZfMeCdH9VT'
                }
            });
            if (response.status === 200) {
                console.log("Gebruiker is geregistreerd");
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
                    <input type="text"
                           name="fullName"
                           id="fullName"
                           className="form-control"
                           onChange={handleInput}
                    />
                    <label className="form-label" form="fullName">Naam</label>
                    {errors.username && <span className="text-danger"> {errors.username}</span>}
                </div>
                <div className="form-outline mb-4">
                    <input type="email"
                           name="registerEmail"
                           id="registerEmail"
                           className="form-control"
                           onChange={handleInput}
                    />
                    <label className="form-label" form="registerEmail">Email adres</label>
                    {errors.email && <span className="text-danger"> {errors.email}</span>}
                </div>

                {/*Confirm Email input*/}
                <div className="form-outline mb-4">
                    <input type="email"
                           name="confirmEmail"
                           id="confirmEmail"
                           className="form-control"
                           onChange={handleInput}
                    />
                    <label className="form-label" form="confirmEmail">Bevestig email adres</label>
                    {errors.confirmEmail && <span className="text-danger"> {errors.confirmEmail}</span>}
                </div>

                {/*Password input*/}
                <div className="form-outline mb-4">
                    <input type="password"
                           name="registerPassword"
                           id="registerPassword"
                           className="form-control"
                           onChange={handleInput}
                    />
                    <label className="form-label" form="registerPassword">Wachtwoord</label>
                    {errors.password && <span className="text-danger"> {errors.password}</span>}
                </div>

                {/*Submit button*/}
                <button type="submit" className="btn btn-primary btn-block mb-4">Registreer</button>

                {/*Register buttons*/}
                <div className="text-center">
                    <p>Al een account? <span className="btn btn-primary"
                                             >Inloggen</span>
                    </p>
                </div>
            </form>
        </>)
}

export default Register;