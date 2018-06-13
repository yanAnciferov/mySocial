import {HANDLE_CHANGE, SEX_CHANGE} from "../constans/ActionTypes"
import {nameValidate, dateValidate, emailValidate, sexValidate} from "../components/pages/registration/validate"
const initialState = {

    firstname: "",
    surname: "",
    parrentname: "",
    email: "",
    date: Date.now(),
    sex: "",
    
    validateState: {
        firstname: {
            isError: false,
            message: "Укажите ваше имя"
        },
        surname: {
            isError: false,
            message: "Укажите вашу фамилию"
        },
        parrentname: {
            isError: false,
            message: "Укажите ваше отчество(не обязательно)"
        },
        email: {
            isError: false,
            message: "Укажите вашу почту"
        },
        date: {
            isError: false,
            message: "Укажите вашу дату рождения"
        },
        sex: {
            isError: false,
            message: "Укажите ваш пол"
        }
    }
} 



export default function (state = initialState, action) {
    
    if(action.type === 'ON_SUBMIT'){

        console.log(action.payload)

        var newValidateState = {
            firstname: nameValidate(action.payload.firstname,true, "firstname"),
            surname: nameValidate(action.payload.surname,true, "surname"),
            parrentname: nameValidate(action.payload.parrentname,false, "parrentname"),
            email: emailValidate(action.payload.email),
            date: dateValidate(action.payload.date),
            sex: sexValidate(action.payload.sex)
        }

        var isFormValid = true;

        for(var field in newValidateState )
        {
            isFormValid = isFormValid && !newValidateState[field].isError
        }
        console.log(isFormValid);
        return {
            ...state,
            validateState: newValidateState
        }
    }

    if(action.type === 'ON_CHANGE'){
        console.log(action.payload)
        return {
            ...state
        }
    }

    return state;
    
}