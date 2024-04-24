import axios from "axios";

export async function checkAuthenticateValidity(values, login) {

    try {
        const response = await axios.post("https://api.datavortex.nl/kamonlinenovi/users/authenticate", {
                username: `${values.username}`,
                password: `${values.password}`
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
            return { status: response.status };
        }
    } catch (error) {

        if (error.response && error.response.status === 400) {
            //console.error(error);
            return { status: error.response.status};
        }
        else if (error.response && error.response.status === 401) {
            //console.error(error);
            return { status: error.response.status };
        } else {
            // console.error(error);
            return { error: "Er is een fout opgetreden bij het inloggen" };
        }
    }
}