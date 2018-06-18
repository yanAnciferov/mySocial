
var { IMAGE_SIZE, REGEX, SEX_TYPES, DATE, IMAGE } = require('../constants/common');
var { USER } = require("../constants/modelNames");
var { USER_ERRORS } = require("../constants/errors");
var fs = require("fs");

module.exports.validateUser = function(newUser){
    
    var firstnameValid = nameValidate(newUser.firstname, true, USER.FIRSTNAME);
    if(firstnameValid.isError)
        return firstnameValid;

    var surnameValid = nameValidate(newUser.surname, true, USER.SURNAME);
    if(surnameValid.isError)
        return surnameValid;

    var parrentValid = nameValidate(newUser.firstname, false, USER.FIRSTNAME);
    if(parrentValid.isError)
        return parrentValid;

    var sexValid = sexValidate(newUser.sex, false);
    if(sexValid.isError)
        return sexValid;

    var dateValid = dateValidate(newUser.birthdate, false);
    if(dateValid.isError)
        return dateValid;

    var imageValid = imageValidation(newUser.imageFile);
    if(imageValid.isError)
        return imageValid;
   

    var rectValid = rectValidation(newUser.imageRect,newUser.imageFile);
    if(rectValid.isError)
        return rectValid;

    return {
        isError: false,
        message: USER_ERRORS.NO_ERROR
    }

}


function nameValidate(name, required, typeField) {

   
    if(typeof name !== "string" )
        return {
            isError: true,
            field: typeField,
            message: USER_ERRORS.INVALIDATE_ENTRY_PARAM
        }
    
    if(name.length == 0)
    {
        return {
            isError: required,
            field: typeField,
            message: (required) ? `${USER_ERRORS.REQUIRED}` : USER_ERRORS.NO_ERROR
        } 
    }
       
        

    if(name.length < 2 || name.length > 32)
        return {
            isError: true,
            field: typeField,
            message: `${USER_ERRORS.NAME_LENGTH}`
        }



    if(REGEX.NAME_REGEX.test(name) == false)
        return {
            isError: true,
            field: typeField,
            message: `${USER_ERRORS.NAME_OPTION}`
        }

    return {
        isError: false,
        field: typeField,
        message: ""
    }
}


function dateValidate(dateParam) {

    if(dateParam == "") 
        return {
            isError: true,
            field: USER.BIRTHDATE,
            message: USER_ERRORS.REQUIRED
        }

    var date = new Date(dateParam);
    if(date == 'Invalid Date'){
        return {
            isError: true,
            field: USER.BIRTHDATE,
            message: USER_ERRORS.INVALIDATE_ENTRY_PARAM
        }
    }

    var min = new Date(DATE.MIN)
    var max = new Date(DATE.MAX)
    console.log(min)
    if(date.getFullYear() < min.getFullYear())
        return {
            isError: true,
            field: USER.BIRTHDATE,
            message: USER_ERRORS.MIN_DATE
        }

    if(date.getFullYear() > max.getFullYear())
        return {
            isError: true,
            field: USER.BIRTHDATE,
            message: USER_ERRORS.MAX_DATE
        }

    return {
        isError: false,
        field: USER.BIRTHDATE,
        message: USER_ERRORS.NO_ERROR
    }
}


function sexValidate(sex) {

    if(sex == "")
        return {
            isError: true,
            field: USER.SEX,
            message: USER_ERRORS.REQUIRED
        }
    
    
  
    if([SEX_TYPES.MALE, SEX_TYPES.FEMALE].indexOf(sex) !== -1)
        return {
            isError: false,
            field: USER.SEX,
            message: USER_ERRORS.NO_ERROR
        }
    else return {
        isError: true,
        field: USER.SEX,
        message: USER_ERRORS.INVALIDATE_ENTRY_PARAM
    }
}


function imageValidation(file) {

    if(file == undefined){
        return {
            isError: false,
            message: USER_ERRORS.NO_ERROR
        } 
    }
   
    if({}.toString.call(file.__proto__) !== "[object Object]")
        return {
            isError: true,
            field: USER.IMAGE,
            message: USER_ERRORS.INVALIDATE_ENTRY_PARAM
        }

    if(IMAGE.ARRAY_FORMATS.indexOf(file.mimetype) == -1){

        
        return {
            isError: true,
            field: USER.IMAGE,
            message: USER_ERRORS.IMAGE_INVALIDATE_FORMAT
        }
    }

    if(file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB < IMAGE_SIZE.MIN_IMAGE_SIZE_IN_KB || file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB > IMAGE_SIZE.MAX_IMAGE_SOZE_IN_BYTE)
        return {
            isError: true,
            field: USER.IMAGE,
            message: USER_ERRORS.IMAGE_INVALIDATE_SIZE
        }

    else return {
        isError: false,
        field: USER.IMAGE,
        message: USER_ERRORS.NO_ERROR
    }

}


function rectValidation(rect, file) {
    if(rect == null)
        return {
            isError: file !== undefined,
            field: USER.RECT,
            message: USER_ERRORS.INVALIDATE_ENTRY_PARAM
        }
        console.log(rect.x.toString())
    if(rect.x === undefined || rect.y === undefined || rect.width === undefined  || rect.height === undefined)
    return {
        isError: true,
        field: USER.RECT,
        message: USER_ERRORS.RECT_FORMAT_ERROR
    }

    var propValid = 
        (rect.x <= 1 && rect.x >= 0 &&
            rect.y <= 1 && rect.y >= 0 && 
            rect.height <= 1 && rect.height >= 0 &&
                rect.width <= 1 && rect.width >= 0)

    if(propValid == false)
        return {
            isError: true,
            field: USER.RECT,
            message: USER_ERRORS.RECT_FIELD_ERROR
        }

    return {
        isError: false,
        field: USER.RECT,
        message: USER_ERRORS.NO_ERROR
    }
}