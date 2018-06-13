export function nameValidate(name, required, typeField) {

    var messages = {
        firstname: {
            noError: "Укажите ваше имя"
        },
        surname: {
            noError: "Укажите вашу фамилию"
        },
        parrentname: {
            noError: "Укажите ваше отчество"
        }
    }

    if(name.length == "" && required == true)
        return {
            isError: true,
            message: "Это поле должно быть заполнено"
        }

    if(name.length == "" && required == false)
        return {
            isError: false,
            message: messages[typeField].noError
        }

    if(name.length < 2 || name.length > 32)
        return {
            isError: true,
            message: "Значение поля должно быть длинной от 2 до 32 символов"
        }



    if(/[a-zA-Zа-яА-Я]/.test(name) == false)
        return {
            isError: true,
            message: "Это поле должно состоять из букв латинницы или крилицы и не содержать пробелов"
        }

    return {
        isError: false,
        message: messages[typeField].noError
    }
}

export function emailValidate(email) {

    if(email.length == "")
        return {
            isError: true,
            message: "Это поле должно быть заполнено"
        }

        if(/[a-zA-Z]{2,}@[a-zA-Z](\.?)[a-zA-Z]/.test(email) == false)
        return {
            isError: true,
            message: "Email должен быть указан в формате domain@username.hostname"
        }

    return {
        isError: false,
        message: "Укажите ваш Email"
    }
}



export function dateValidate(date) {

    if(new Date(date).getFullYear() < new Date("1920-01-01").getFullYear())
        return {
            isError: true,
            message: "Минимальная дата - 1 января 1920 года"
        }

    if(new Date(date).getFullYear() > new Date("2017-01-01").getFullYear())
        return {
            isError: true,
            message: "Максимальная дата - 31 декабря 2017 года"
        }

    return {
        isError: false,
        message: "Укажите вашу дату рождения"
    }
}


export function sexValidate(sex) {

    if(sex == "")
        return {
            isError: true,
             message: "Укажите ваш пол"
        }

  

    return {
        isError: false,
        message: "Укажите ваш пол"
    }
}
