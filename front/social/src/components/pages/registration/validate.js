import  { MESSAGE, REGEX, SEX_TYPES, IMAGE, DATE, MODEL_NAMES }   from '../../../constans/registration'
import { IMAGE_SIZE } from '../../../constans/common'
import { isError } from 'assert/node_modules/util';


export function nameValidate(name, required, typeField) {


    var messages = {
        firstname: {
            noError: MESSAGE.ENTER_NAME
        },
        surname: {
            noError: MESSAGE.ENTER_SURNAME
        },
        parrentname: {
            noError: MESSAGE.ENTER_PARRENTNAME
        }
    }

    var state = {
        isError: false,
        message: []
    }

    let string = "string";
    if(typeof name !== string || typeof typeField !== string || typeof required !== 'boolean')
    {
        state.isError = true;
        state.message.push(MESSAGE.INVALIDATE_ENTRY_PARAM);
        return state;
    }

    if([MODEL_NAMES.FIRSTNAME,MODEL_NAMES.SURNAME,MODEL_NAMES.PARRENTNAME].indexOf(typeField) == -1)
    {
        state.isError = true;
        state.message.push(MESSAGE.INVALIDATE_ENTRY_PARAM);
        return state;
    }

    if(name.length == 0)
    {
        state.isError = required;
        state.message.push((required) ? MESSAGE.REQUIRED : messages[typeField].noError);
        return state;
    }
    
       
        

    if(name.length < 2 || name.length > 32)
    {
        state.isError = true;
        state.message.push(MESSAGE.NAME_LENGTH);
    }

    if(REGEX.NAME_REGEX.test(name) == false)
    {
        state.isError = true;
        state.message.push(MESSAGE.NAME_OPTION);
    }

    if(state.isError == false)
        state.message.push(messages[typeField].noError);

    return state;
}

export function emailValidate(email) {

    var state = {
        isError: false,
        message: []
    }

    if(typeof email !== "string")
    {
        state.isError = true;
        state.message.push(MESSAGE.INVALIDATE_ENTRY_PARAM);
        return state;
    }   

    if(email.length == 0)
    {
        state.isError = true;
        state.message.push(MESSAGE.REQUIRED);
        return state;
    } 


    if(REGEX.EMAIL_REGEX.test(email) == false)
    {
        state.isError = true;
        state.message.push(MESSAGE.EMAIL_OPTION);
        return state;
    } 


    
    if(state.isError == false)
        state.message.push(MESSAGE.ENTER_EMAIL)
    return state;
    
}



export function dateValidate(dateParam) {
    
    var state = {
        isError: false,
        message: []
    }

    if(dateParam == "") 
    {
        state.isError = true;
        state.message.push(MESSAGE.REQUIRED)
        return state;
    }


    var date = new Date(dateParam);
    if(date == 'Invalid Date' || dateParam === null) {
        state.isError = true;
        state.message.push(MESSAGE.INVALIDATE_ENTRY_PARAM)
        return state;
    }

    var min = new Date(DATE.MIN)
    var max = new Date(DATE.MAX)

    if(date.getFullYear() < min.getFullYear()){
        state.isError = true;
        state.message.push(MESSAGE.MIN_DATE)
        return state;
    }

    if(date.getFullYear() > max.getFullYear()){
        state.isError = true;
        state.message.push(MESSAGE.MAX_DATE)
        return state;
    }

    
    if(state.isError == false)
        state.message.push(MESSAGE.ENTER_BIRTHDATE)
    return state;
    
}


export function sexValidate(sex) {

    var state = {
        isError: false,
        message: []
    }

    if(sex == "")
    {
        state.isError = true,
        state.message.push(MESSAGE.REQUIRED)
        return state;
    }
    
    
  
    if([SEX_TYPES.MALE, SEX_TYPES.FEMALE].indexOf(sex) !== -1)
    {
        state.isError = false,
        state.message.push(MESSAGE.ENTER_SEX)
        return state;
    }
    else {
        state.isError = true,
        state.message.push(MESSAGE.INVALIDATE_ENTRY_PARAM)
        return state;
    }
}


export function imageValidation(file, isSubmit) {

    var state = {
        isError: false,
        message: []
    }

    if(file == null){
        state.isError = isSubmit;
        state.message.push(MESSAGE.ENTER_FILE);
        return state;
    }

   
    if({}.toString.call(file.__proto__) !== "[object File]"){
        state.isError = true;
        state.message.push(MESSAGE.INVALIDATE_ENTRY_PARAM);
        return state;
    }

    if(IMAGE.ARRAY_FORMATS.indexOf(file.type) == -1){
        state.isError = true;
        state.message.push(IMAGE.INVALIDATE_FORMAT);
    }

    if(file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB < IMAGE_SIZE.MIN_IMAGE_SIZE_IN_KB || file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB > IMAGE_SIZE.MAX_IMAGE_SOZE_IN_BYTE)
    {
        state.isError = true;
        state.message.push(IMAGE.INVALIDATE_SIZE);
    }

    if(isError == false){
        state.message.push(MESSAGE.ENTER_FILE);
    }

    return state;
}