const MALE = "male";
const FEMALE = "female";

const MIN = "1920-01-01"
const MAX = "2017-12-31"


const INVALIDATE_ENTRY_PARAM = "Invalidate entry param"
const ENTER_NAME = "Enter your name"
const ENTER_SURNAME = "Enter your surname"
const ENTER_PARRENTNAME = "Enter your parrentname(no require)"
const ENTER_EMAIL = "Enter your email"
const ENTER_BIRTHDATE = "Enter your birthdate"
const ENTER_SEX = "Select your gender"
const ENTER_FILE = "Upload file"
const ENTER_PASSWORD = "Enter your password"
const SET_AVATAR = "Load avatar"

const REQUIRED = "Field is require"
const MIN_DATE = "The minimum date is January 1, 1920"
const MAX_DATE = "The maximum date us December 31, 2017"
const NAME_LENGTH = "The field value must be between 2 and 32 characters long"
const NAME_OPTION = "This field must consist of letters of latin or clay and do not contain spaces"
const EMAIL_OPTION = "Email must be specified in the format domain@username.hostname"
const EMAIL_BUSY = "This email is being used by another user"
const EMAIL_NOT_EXISTENCE = "This email is not exist"
const TECHNICAL_WORK_ON_SERVER = "Technical work is carried out on the server, sorry for the convenience"
const FAILED_SEND_MESSAGE_TO_EMAIL = "Could not send message to this mail"
const USER_NOT_FOUND_ABOUT_EMAIL = "Incorrect email"
const INCORRECT_PASSWORD = "Incorrect password"

const PASSWORD_LENGTH = "The password must be between 6 and 31 characters in length";
const PASSWORD_DIFFERENT = "Passwords do not match";
const ENTER_NEW_PASSWORD = "Enter new password";
const ENTER_OLD_PASSWORD = "Enter your old password";
const ENTER_CONFIRM_PASSWORD = "Confirm the password";

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]{2,}@[a-zA-Z]{2,}(\.)[a-zA-Z]{1,}/
const NAME_REGEX = /^[a-zA-Zа-яА-Я]+$/


const FIRSTNAME = "firstname"
const SURNAME = "surname"
const PARRENTNAME = "parrentname"
const EMAIL = "email"
const SEX = "sex"
const BIRTHDATE = "birthdate"
const AVATAR = "avatar"
const PASSWORD = "password"
const ARRAY_FORMATS = ["image/jpeg", "image/jpg", "image/png"]
const INVALIDATE_FORMAT = "Only .jpeg, .jpg, .png files"
const INVALIDATE_SIZE = "The file size should be from 40kb to 5mb"


const OLD_PASSWORD = "oldPassword";
const NEW_PASSWORD = "newPassword";
const CONFIRM_PASSWORD = "confirmPassword";

export const REGEX = {
    EMAIL_REGEX,
    NAME_REGEX
}

export const MODEL_NAMES = {
    FIRSTNAME,
    SURNAME,
    PARRENTNAME,
    EMAIL,
    SEX,
    BIRTHDATE,
    AVATAR,
    PASSWORD
}

export const IMAGE = {
    ARRAY_FORMATS,
    INVALIDATE_FORMAT,
    INVALIDATE_SIZE
}

export const SEX_TYPES = {
    MALE,
    FEMALE
}

export const DATE = {
    MIN,
    MAX
}


export const MESSAGE = {
    REQUIRED,
    MIN_DATE,
    MAX_DATE,
    NAME_LENGTH, 
    NAME_OPTION, 
    EMAIL_OPTION,
    INVALIDATE_ENTRY_PARAM,
    ENTER_NAME,
    ENTER_SURNAME,
    ENTER_PARRENTNAME,
    ENTER_EMAIL,
    ENTER_BIRTHDATE,
    ENTER_SEX,
    ENTER_FILE,
    ENTER_PASSWORD,
    SET_AVATAR,
    EMAIL_BUSY,
    EMAIL_NOT_EXISTENCE,
    TECHNICAL_WORK_ON_SERVER,
    FAILED_SEND_MESSAGE_TO_EMAIL,
    USER_NOT_FOUND_ABOUT_EMAIL,
    INCORRECT_PASSWORD
    
}


export const PASSWORD_MESSAGES = {
    PASSWORD_LENGTH,
    PASSWORD_DIFFERENT,
    ENTER_NEW_PASSWORD,
    ENTER_OLD_PASSWORD,
    ENTER_CONFIRM_PASSWORD 
}

export const PASSWORD_FIELDS = {
    OLD_PASSWORD,
    NEW_PASSWORD,
    CONFIRM_PASSWORD
}