import { AuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { checkPasswordValidity } from "../../helper/checkPasswordValidity.js";
import { SlPencil } from 'react-icons/sl';
import Header from "../../components/global/Header.jsx";
import "./Profile.css";

// eslint-disable-next-line react/prop-types
function Profile() {

    const {user, setRefresh, logout} = useContext(AuthContext);
    const icon = <SlPencil/>;
    const [edit, toggleEdit] = useState(false);
    const [formValues, setFormValues] = useState({
        username: null,
        email: null,
        password: null,
        info: null
    });
    const [label, setLabel] = useState({
        username: false,
        email: false,
        password: false
    });
    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        setLabel(prev => ({ ...prev, [name]: value !== "" }));
    }

    const storedToken = localStorage.getItem('token');
    let decodedStoredToken;

    // Update user profile
    const handleSubmit = async (event) => {
        event.preventDefault();
        alert("1 " + formValues.password);
        if (formValues.username === '') {
            formValues.username = null;
        }
        if (formValues.password === '') {
            formValues.password = null;
        }if (formValues.password !== null) {
            if (!checkPasswordValidity(formValues.password)) {
                setErrors({password: true});
            }
        }
        if (formValues.email === '') {
            formValues.email = null;
        }
        if (formValues.info === '') {
            formValues.info = null;
        }
        else {
            alert("2 "+ formValues.password+" "+"3 "+formValues.username);
            try {
                if (storedToken) {
                    decodedStoredToken = jwtDecode(storedToken);
                }
                const response = await axios.put(`https://api.datavortex.nl/kamonlinenovi/users/${decodedStoredToken.sub}`, formValues, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`,
                        'X-Api-Key': 'kamonlinenovi:rv8l37E54HZfMeCdH9VT'
                    },
                });
                if (response.status === 204) {
                    // Reset labels and errors
                    setLabel({
                        username: false,
                        email: false,
                        password: false
                    });
                    setErrors({
                        username: false,
                        email: false,
                        password: false
                    });
                    toggleEdit(!edit);
                    console.log("Gebruiker is gewijzigd");

                    setFormValues({
                        username: null,
                        email: null,
                        password: null,
                        info: null
                    });
                    if(formValues.username !== null || formValues.password !== null) {
                        logout('/login');
                    }else {
                        setRefresh(true);
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    const response = error.response;
                    alert(response.data);
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
            <Header setClass="global products"/>

            <main className="outer-container">

                <section className="inner-container">
                    <section className="profile">
                        <h2>Profiel:</h2>
                        <p>Naam: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Info: {user.info ? user.info : "n.v.t."}</p>

                    </section>
                    <section className="profile--editing">
                        {edit ? <>
                            <div className='form'>
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
                                {/*Password input*/}
                                <div className="form-outline mb-4">
                                    <input type="password"
                                           name="password"
                                           id="password"
                                           className={`form-control ${errors.password || errors.password && 'danger'}`}
                                           onChange={handleInput}
                                    />
                                    <label className={`form-label ${label.password && 'active'}`}
                                           form="password">Wachtwoord</label>
                                    {errors.password && <span className="text-danger">Foutief wachtwoord (8 karakters en tenminste 1 cijfer, 1 letter en 1 speciale teken)</span>}
                                </div>
                                <div className="form-outline mb-4">
                                   <textarea
                                       type="text"
                                       name="info"
                                       id="info"
                                       className="form-control"
                                       onChange={handleInput}
                                   >
                                   </textarea>
                                    <label className={`form-label ${label.info && 'active'}`} form="info">Persoonlijke info</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Opslaan</button>
                            </form>
                            </div>
                            <div className='modal'>
                                <div>
                                   <p>Wanneer de gebruikersnaam en/of het wachtwoord wordt gewijzigd, moet je opnieuw inloggen.</p>
                                </div>
                            </div></>
                            :
                            <button type='button' className="btn btn-primary btn-block mb-4" onClick={() => toggleEdit(!edit)}>
                                bewerk
                                {icon}
                            </button>
                        }
                    </section>

                </section>
            </main>

        </>
    );
}

export default Profile;