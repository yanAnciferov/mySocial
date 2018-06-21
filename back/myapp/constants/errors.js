const ERROR_SEND_MESSAGE_TO_EMAIL = "failed send message to email";
const EMAIL_BUSY = "email busy";
const INVALID_EMAIL = "Invalid email"
const NETWORK_ERROR = "Network Error"
const DB_NOT_CONNECTED = "db not connected"
const INVALIDATE_ENTRY_PARAM = "invalidate param"
const NO_ERROR = "ok"
const REQUIRED = "required"
const NAME_LENGTH = "invalidate length of"
const NAME_OPTION = " string should be contained only kyrylic or latin character"
const MIN_DATE = "min date - 01.01.1920"
const MAX_DATE = "max date - 31.12.2017"
const IMAGE_INVALIDATE_SIZE = "max image size - 40kb, min image size - 5mb"
const IMAGE_INVALIDATE_FORMAT = "image type must be .jpeg .png .jpg "
const RECT_FORMAT_ERROR = "rect must be contained fields: x, y, width, heigth"
const RECT_FIELD_ERROR = "rect fields value must be from 0 to 1"
const FAILED_SEND_MESSAGE_TO_EMAIL = "failed send message to email"
const SAVE_FILE_ERROR = "save file error"
const REGISTRATION_USER_MODEL_INVALIDE = " registration user model invalidate"
const UNAUTHORIZED = "unauthorized"
const INCORECT_DATA_FOR_LOGIN = "incorect data for login"
const INCORECT_EMAIL_FOR_LOGIN = "incorect email for login"
const INCORECT_PASSWORD_FOR_LOGIN = "incorect password for login"

module.exports.USER_ERRORS = {
    ERROR_SEND_MESSAGE_TO_EMAIL,
    EMAIL_BUSY,
    INVALID_EMAIL,
    NETWORK_ERROR,
    DB_NOT_CONNECTED,
    INVALIDATE_ENTRY_PARAM,
    NO_ERROR,
    REQUIRED,
    NAME_LENGTH,
    NAME_OPTION,
    MIN_DATE,
    MAX_DATE,
    IMAGE_INVALIDATE_SIZE,
    IMAGE_INVALIDATE_FORMAT,
    RECT_FORMAT_ERROR,
    RECT_FIELD_ERROR,
    FAILED_SEND_MESSAGE_TO_EMAIL,
    SAVE_FILE_ERROR,
    REGISTRATION_USER_MODEL_INVALIDE
}

module.exports.COMMON = {
    NO_ERROR,
    REQUIRED
}

module.exports.LOGIN = {
    INCORECT_DATA_FOR_LOGIN,
    UNAUTHORIZED,
    INCORECT_PASSWORD_FOR_LOGIN,
    INCORECT_EMAIL_FOR_LOGIN
}