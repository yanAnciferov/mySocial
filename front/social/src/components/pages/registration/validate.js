import  { MESSAGE, REGEX, SEX_TYPES, IMAGE, DATE, MODEL_NAMES }   from '../../../constans/registration'
import { IMAGE_SIZE } from '../../../constans/common'
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

    let string = "string";
    if(typeof name !== string || typeof typeField !== string || typeof required !== 'boolean')
        return {
            isError: true,
            message: MESSAGE.INVALIDATE_ENTRY_PARAM
        }

    if([MODEL_NAMES.FIRSTNAME,MODEL_NAMES.SURNAME,MODEL_NAMES.PARRENTNAME].indexOf(typeField) == -1)
        return {
            isError: true,
            message: MESSAGE.INVALIDATE_ENTRY_PARAM
        }

    if(name.length == 0)
    {
        return {
            isError: required,
            message: (required) ? MESSAGE.REQUIRED : messages[typeField].noError
        } 
    }
       
        

    if(name.length < 2 || name.length > 32)
        return {
            isError: true,
            message: MESSAGE.NAME_LENGTH
        }



    if(REGEX.NAME_REGEX.test(name) == false)
        return {
            isError: true,
            message: MESSAGE.NAME_OPTION
        }

    return {
        isError: false,
        message: messages[typeField].noError
    }
}

export function emailValidate(email) {


    if(typeof email !== "string" )
        return {
            isError: true,
            message: MESSAGE.INVALIDATE_ENTRY_PARAM
        }

    if(email.length == 0)
        return {
            isError: true,
            message: MESSAGE.REQUIRED
        }

        if(REGEX.EMAIL_REGEX.test(email) == false)
        return {
            isError: true,
            message: MESSAGE.EMAIL_OPTION
        }

    return {
        isError: false,
        message: MESSAGE.ENTER_EMAIL
    }
}



export function dateValidate(dateParam) {


    if(dateParam == "") 
        return {
            isError: true,
            message: MESSAGE.REQUIRED
        }

    var date = new Date(dateParam);
    if(date == 'Invalid Date' || dateParam === null){
        return {
            isError: true,
            message: MESSAGE.INVALIDATE_ENTRY_PARAM
        }
    }

    var min = new Date(DATE.MIN)
    var max = new Date(DATE.MAX)

    if(date.getFullYear() < min.getFullYear())
        return {
            isError: true,
            message: MESSAGE.MIN_DATE
        }

    if(date.getFullYear() > max.getFullYear())
        return {
            isError: true,
            message: MESSAGE.MAX_DATE
        }

    return {
        isError: false,
        message: MESSAGE.ENTER_BIRTHDATE
    }
}


export function sexValidate(sex) {

    if(sex == "")
        return {
            isError: true,
            message: MESSAGE.REQUIRED
        }
    
    
  
    if([SEX_TYPES.MALE, SEX_TYPES.FEMALE].indexOf(sex) !== -1)
        return {
            isError: false,
            message: MESSAGE.ENTER_SEX
        }
        
    else return {
        isError: true,
        message: MESSAGE.INVALIDATE_ENTRY_PARAM
    }
}


export function imageValidation(file, isSubmit) {

    if(file == null){
        return {
            isError: isSubmit,
            message: MESSAGE.ENTER_FILE
        } 
    }

   
    if({}.toString.call(file.__proto__) !== "[object File]")
        return {
            isError: true,
            message: MESSAGE.INVALIDATE_ENTRY_PARAM
        }

    if(IMAGE.ARRAY_FORMATS.indexOf(file.type) == -1)
        return {
            isError: true,
            message: IMAGE.INVALIDATE_FORMAT
        }

    if(file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB < IMAGE_SIZE.MIN_IMAGE_SIZE_IN_KB || file.size / IMAGE_SIZE.COUNT_BYTES_IN_KB > IMAGE_SIZE.MAX_IMAGE_SOZE_IN_BYTE)
        return {
            isError: true,
            message: MESSAGE.INVALIDATE_SIZE
        }

    else return {
        isError: false,
        message: MESSAGE.ENTER_FILE
    }

}