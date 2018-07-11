
var { IMAGE_SIZE, REGEX, SEX_TYPES, DATE, IMAGE } = require('../constants/common');
var { USER } = require("../constants/modelNames");
var { USER_ERRORS } = require("../constants/errors");
var fs = require("fs");



module.exports.validateUser = function(newUser){
    
    let validateStates = {
        firstnameValid: nameValidate(newUser.firstname, true, USER.FIRSTNAME),
        surnameValid: nameValidate(newUser.surname, true, USER.SURNAME),
        parrentValid: nameValidate(newUser.parrentname, false, USER.PARRENTNAME),
        sexValid: sexValidate(newUser.sex, false),
        dateValid: dateValidate(newUser.birthdate, false),
        imageValid: imageValidation(newUser.imageFile),
        rectValid: rectValidation(newUser.imageRect,newUser.imageFile)
    }


    return checkValidateState(validateStates);

}


module.exports.validatePublication = function(newPublication){
    
  
    let validateStates = {
        textValid: textValidation(newPublication.textBody, !newPublication.imageFile),
        imageValid: imageValidation(newPublication.imageFile)
    }

 
    return checkValidateState(validateStates);

}


module.exports.validatePassword = function(oldPassword, newPassword, confirmPassword){
    let validateStates = {
        newValid: passwordFieldValidate(newPassword),
        oldValid: passwordFieldValidate(oldPassword),
        confirmValid: passwordFieldValidate(confirmPassword) 
    }

    if(newPassword !== confirmPassword && !validateStates.confirmValid.isError)
    {
        validateStates.confirmPassword.isError = true;
        validateStates.confirmPassword.messages = [];
        validateStates.confirmPassword.messages.push(PASSWORD_MESSAGES.PASSWORD_DIFFERENT)
    }
       

    return checkValidateState(validateStates);
}


function passwordFieldValidate(password){
    let state = {
        isError: false,
        messages: []
    }

    let string = "string";
    if(typeof password !== string)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.INVALIDATE_ENTRY_PARAM);
        return state;
    }

    if(password.length == 0)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.REQUIRED);
        return state;
    }
       
        

    if(password.length < 6 || password.length > 32)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.NAME_LENGTH);
    }

    if(!state.isError)
        state.messages.push(USER_ERRORS.NO_ERROR);

    return state;
}


function nameValidate(name, required, typeField) {

    let state = {
        isError: false,
        messages: []
    }

    let string = "string";
    if(typeof name !== string || typeof typeField !== string || typeof required !== 'boolean')
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.INVALIDATE_ENTRY_PARAM);
        return state;
    }

    if([USER.FIRSTNAME,USER.SURNAME,USER.PARRENTNAME].indexOf(typeField) == -1)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.INVALIDATE_ENTRY_PARAM);
        return state;
    }
    
    if(name.length == 0)
    {
        state.isError = required;
        state.messages.push((required) ? USER_ERRORS.REQUIRED : USER_ERRORS.NO_ERROR);
        return state;
    }
       
        

    if(name.length < 2 || name.length > 32)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.NAME_LENGTH);
    }



    if(REGEX.NAME_REGEX.test(name) == false)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.NAME_OPTION)
    }

    if(!state.isError)
        state.messages.push(USER_ERRORS.NO_ERROR);
    return state;
}


function dateValidate(dateParam) {

    let state = {
        isError: false,
        messages: []
    }


    if(dateParam == "") 
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.REQUIRED);
        return state;
    }


    var date = new Date(dateParam);
    if(date == 'Invalid Date' || dateParam == null){
        state.isError = true;
        state.messages.push(USER_ERRORS.INVALIDATE_ENTRY_PARAM);
        return state;
    }

    var min = new Date(DATE.MIN)
    var max = new Date(DATE.MAX)
    if(date.getFullYear() < min.getFullYear())
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.MIN_DATE);
        return state;
    }

    if(date.getFullYear() > max.getFullYear())
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.MAX_DATE);
        return state;
    }

    if(!state.isError)
        state.messages.push(USER_ERRORS.NO_ERROR);
    return state;
}


function sexValidate(sex) {


    let state = {
        isError: false,
        messages: []
    }


    if(sex == "")
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.REQUIRED)
        return state;
    }

    
  
    if([SEX_TYPES.MALE, SEX_TYPES.FEMALE].indexOf(sex) !== -1)
    {
        state.isError = false;
        state.messages.push(USER_ERRORS.NO_ERROR)
        return state;
    }
    else {
        state.isError = true;
        state.messages.push(USER_ERRORS.INVALIDATE_ENTRY_PARAM)
        return state;
    }
}


function imageValidation(file) {

    let state = {
        isError: false,
        messages: []
    }

    if(file == undefined){
        state.isError = false;
        state.messages.push(USER_ERRORS.NO_ERROR)
        return state;
    }
   
    if({}.toString.call(file.__proto__) !== "[object Object]"){
        state.isError = true;
        state.messages.push(USER_ERRORS.INVALIDATE_ENTRY_PARAM)
        return state;
    }
 

    if(IMAGE.ARRAY_FORMATS.indexOf(file.mimetype) == -1){
        state.isError = true;
        state.messages.push(USER_ERRORS.IMAGE_INVALIDATE_FORMAT)
    }

    if(file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB < IMAGE_SIZE.MIN_IMAGE_SIZE_IN_KB || file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB > IMAGE_SIZE.MAX_IMAGE_SOZE_IN_BYTE)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.IMAGE_INVALIDATE_SIZE)
    }

    if(state.isError == false)
        state.messages.push(USER_ERRORS.NO_ERROR);
    return state;

}


function rectValidation(rect, file) {

    let state = {
        isError: false,
        messages: []
    }

    if(typeof rect != "object" || rect == null ||
     rect.x === null || rect.y === null || rect.width === null || rect.height === null)
    {
        state.isError = typeof file != undefined && file != null;
        state.messages.push((state.isError) ? USER_ERRORS.INVALIDATE_ENTRY_PARAM : USER_ERRORS.NO_ERROR)
        return state;
    }

    if(rect.x === undefined || rect.y === undefined || rect.width === undefined  || rect.height === undefined)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.RECT_FORMAT_ERROR)
        return state;
    }

    if(typeof rect.x != "number" || typeof rect.y != "number" || typeof rect.width != "number"  || typeof rect.height != "number")
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.RECT_FIELD_ERROR)
        return state;
    }

    var propValid = 
        (rect.x <= 1 && rect.x >= 0 &&
            rect.y <= 1 && rect.y >= 0 && 
            rect.height <= 1 && rect.height >= 0 &&
                rect.width <= 1 && rect.width >= 0)

    if(propValid == false)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.RECT_FORMAT_ERROR)
        return state;
    }

    if(!state.isError)
        state.messages.push(USER_ERRORS.NO_ERROR);
    return state;
}


function textValidation(text, required){
    let state = {
        isError: false,
        messages: []
    }

    let string = "string";
    if(typeof text !== string  || typeof required !== 'boolean')
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.INVALIDATE_ENTRY_PARAM);
        return state;
    }
    
    if(text.length == 0)
    {
        state.isError = required;
        state.messages.push((required) ? USER_ERRORS.REQUIRED : USER_ERRORS.NO_ERROR);
        return state;
    }
       
    if(text.length > 2048)
    {
        state.isError = true;
        state.messages.push(USER_ERRORS.NAME_LENGTH);
    }

    if(!state.isError)
        state.messages.push(USER_ERRORS.NO_ERROR);

    return state;
}


function checkValidateState(validateStates){
    var forReturnState = {
        isError: false
    }

    for(var state in validateStates) 
    {
        if(validateStates[state].isError){
            forReturnState[state] = validateStates[state];
            forReturnState.isError = true
        }
    }
    return forReturnState;
}


module.exports.nameValidate = nameValidate;
module.exports.sexValidate = sexValidate;
module.exports.dateValidate = dateValidate;
module.exports.rectValidation = rectValidation;
module.exports.textValidation = textValidation;