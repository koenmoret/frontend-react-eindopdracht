import {useState} from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";


function Register() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        confirmEmail: "",
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
        //if (err.fullName === "" && err.registerEmail === "" && err.registerPassword === "") {

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
                navigate('/Login');
            }
        } catch (e) {
            console.error(e);
        }


       // }
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
                           className="form-control"
                           onChange={handleInput}
                    />
                    <label className="form-label" form="username">Gebruikersnaam</label>
                    {errors.username && <span className="text-danger"> {errors.username}</span>}
                </div>
                {/*Email input*/}
                <div className="form-outline mb-4">
                    <input type="email"
                           name="email"
                           id="email"
                           className="form-control"
                           onChange={handleInput}
                    />
                    <label className="form-label" form="email">Email adres</label>
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
                           name="password"
                           id="password"
                           className="form-control"
                           onChange={handleInput}
                    />
                    <label className="form-label" form="password">Wachtwoord</label>
                    {errors.password && <span className="text-danger"> {errors.password}</span>}
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