import { AuthContext } from "../../context/AuthContext.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { checkAuthenticateValidity } from "../../helper/checkAuthenticateValidity.js";
import Header from "../../components/global/Header.jsx";
import Footer from "../../components/global/Footer.jsx";
import "./Authentication.css";



// eslint-disable-next-line react/prop-types
function Login() {

    const {login, values, setValues} = useContext(AuthContext);
    const navigate = useNavigate();
    const [touched, setTouched] = useState({
        username: false,
        password: false
    });
    const [errors, setErrors] = useState({
        username: false,
        password: false
    });
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
        setErrors({ username: false, password: false });
        if (event.target.value === "") {
            setTouched(prev => ({...prev, [event.target.name]: false}));
        } else {
            setTouched(prev => ({...prev, [event.target.name]: true}));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        checkAuthenticateValidity(values, login).then(validation => {
            if (validation.status && validation.status === 200) {
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

    return (
        <>
            <Header setClass="global" />
            <main className="outer-container">
                <section className="inner-container login">
                    <div className="header--title"><NavLink to="/"><h1>KAM Online</h1></NavLink></div>
                    <form action="" onSubmit={handleSubmit}>
                        {/*Username input*/}
                        <div className="form-outline mb-4">
                            <input type="text" name="username" id="username" onChange={handleInput}
                                   className={`form-control username ${errors.username && 'danger'}`} required/>
                            <label className={`form-label ${touched.username ? 'active' : ''}`}
                                   form="username">Gebruikersnaam</label>
                            {errors.username && <span className="text-danger">Gebruikersnaam onbekend</span>}
                        </div>

                        {/*Password input*/}
                        <div className="form-outline mb-4">
                            <input type="password" name="password" id="loginPassword" onChange={handleInput}
                                   className={`form-control ${errors.password && 'danger'}`} required/>
                            <label className={`form-label ${touched.password ? 'active' : ''}`}
                                   form="loginPassword">Wachtwoord</label>
                            {errors.password && <span className="text-danger">Onjuist wachtwoord</span>}
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <span><NavLink
                                    to="/resetPassword">Wachtwoord vergeten?</NavLink></span>
                            </div>
                        </div>

                        {/*Submit button*/}
                        <button type="submit" className="btn btn-primary btn-block mb-4">Inloggen</button>

                        {/*Register link*/}
                        <div className="text-center">
                            <p>Geen account? <span className="btn btn-primary"><NavLink
                                to="/register">Registreer</NavLink></span>
                            </p>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Login;