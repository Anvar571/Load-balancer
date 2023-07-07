export default {
    isValidateData(data){
        const isUserNameVaild = data.username && typeof data.username == "string";
        const isAgeValid = isFinite(data.age) && data.age >= 0;
        const isHobbieValid = Array.isArray(data.hobbies) && data.hobbies.every((hobby) => typeof hobby == "string");

        return isAgeValid && isHobbieValid && isUserNameVaild;
    }
}