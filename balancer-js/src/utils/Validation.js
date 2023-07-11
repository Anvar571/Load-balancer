export default {
    isUserDataValid(user) {
        const isUserNameValid = user.username && typeof user.username === "string";
        const isAgeValid = isFinite(user.age) && user.age >= 0;
        const isHobbiesValid = Array.isArray(user.hobbies)
            && user.hobbies.every((hobby) => typeof hobby === "string");

        return isUserNameValid && isAgeValid && isHobbiesValid;
    }
}