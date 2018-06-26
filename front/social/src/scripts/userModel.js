

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


export function getDifferentFields(obj1, obj2){
    let forReturn = {
        obj1: {

        },
        obj2: {

        },
    }

    for(let field in obj1){
        if(obj1[field] !== obj2[field])
            forReturn.obj1[field] = obj1[field]; 
    }


    for(let field in obj2){
        if(obj2[field] !== obj1[field])
            forReturn.obj2[field] = obj2[field]; 
    }

    return forReturn;
}
