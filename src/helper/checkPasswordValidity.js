export function checkPasswordValidity(password) {
    // Minimum lengte van het wachtwoord
    const minLength = 8;
    // Patroon voor het controleren van het gebruik van hoofdletters, kleine letters, cijfers en speciale tekens
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[^\s]).{8,}$/;

    if (password.length < minLength || !pattern.test(password)) {
        return false;
    }
    return true;
}