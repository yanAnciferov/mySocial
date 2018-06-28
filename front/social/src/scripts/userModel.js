

export function getUserModel(state){
    let {
        firstname,
        surname,
        parrentname,
        email,
        birthdate,
        sex
    } = state;

    return {
        firstname,
        surname,
        parrentname,
        email,
        birthdate,
        sex,
    }
}

