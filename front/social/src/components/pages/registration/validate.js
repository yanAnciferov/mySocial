import  * as consts  from '../../../constans/registration'

export function nameValidate(name, required, typeField) {


    var messages = {
        firstname: {
            noError: consts.ENTER_NAME
        },
        surname: {
            noError: consts.ENTER_SURNAME
        },
        parrentname: {
            noError: consts.ENTER_PARRENTNAME
        }
    }

   
    if(typeof name !== "string" )
        return {
            isError: true,
            message: consts.INVALIDATE_ENTRY_PARAM
        }
    
    if(name.length == 0)
    {
        return {
            isError: required,
            message: (required) ? consts.REQUIRED : messages[typeField].noError
        } 
    }
       
        

    if(name.length < 2 || name.length > 32)
        return {
            isError: true,
            message: consts.NAME_LENGTH_MESSAGE
        }



    if(consts.NAME_REGEX.test(name) == false)
        return {
            isError: true,
            message: consts.NAME_OPTION_MESSAGE
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
            message: consts.INVALIDATE_ENTRY_PARAM
        }

    if(email.length == 0)
        return {
            isError: true,
            message: consts.REQUIRED
        }

        if(consts.EMAIL_REGEX.test(email) == false)
        return {
            isError: true,
            message: consts.EMAIL_OPTION_MESSAGE
        }

    return {
        isError: false,
        message: consts.ENTER_EMAIL
    }
}



export function dateValidate(dateParam) {

    if(dateParam == "") 
        return {
            isError: true,
            message: consts.REQUIRED
        }

    var date = new Date(dateParam);
    if(date == 'Invalid Date'){
        return {
            isError: true,
            message: consts.INVALIDATE_ENTRY_PARAM
        }
    }

    var min = new Date(consts.MIN_DATE)
    var max = new Date(consts.MAX_DATE)

    if(date.getFullYear() < min.getFullYear())
        return {
            isError: true,
            message: consts.MIN_DATE_MESSAGE
        }

    if(date.getFullYear() > max.getFullYear())
        return {
            isError: true,
            message: consts.MAX_DATE_MESSAGE
        }

    return {
        isError: false,
        message: consts.ENTER_BIRTHDATE
    }
}


export function sexValidate(sex) {

    if(sex == "")
        return {
            isError: true,
            message: consts.REQUIRED
        }
    
    
  
    if([consts.MALE,consts.FEMALE].indexOf(sex) !== -1)
        return {
            isError: false,
            message: consts.ENTER_SEX
        }
    else return {
        isError: true,
        message: consts.INVALIDATE_ENTRY_PARAM
    }
}


export function imageValidation(file, isSubmit) {

    if(file == null){
        return {
            isError: isSubmit,
            message: consts.ENTER_FILE
        } 
    }

   
    if({}.toString.call(file.__proto__) !== "[object File]")
        return {
            isError: true,
            message: consts.INVALIDATE_ENTRY_PARAM
        }

    if(["image/jpeg", "image/jpg", "image/png"].indexOf(file.type) == -1)
        return {
            isError: true,
            message: consts.IMAGE_INVALIDATE_FORMAT
        }

    if(file.size / 1024 < 40 || file.size / 1024 > (5 * 1024) * 1024)
        return {
            isError: true,
            message: consts.IMAGE_INVALIDATE_SIZE
        }

    else return {
        isError: false,
        message: consts.ENTER_FILE
    }

}