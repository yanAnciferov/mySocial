const MALE = "male";
const FEMALE = "female";

const MIN = "1920-01-01"
const MAX = "2017-12-31"


const INVALIDATE_ENTRY_PARAM = "Не верный входящий параметр"
const ENTER_NAME = "Укажите ваше имя"
const ENTER_SURNAME = "Укажите вашу фамилию"
const ENTER_PARRENTNAME = "Укажите ваше отчество(не обязательно)"
const ENTER_EMAIL = "Укажите вашу почту"
const ENTER_BIRTHDATE = "Укажите вашу дату рождения"
const ENTER_SEX = "Укажите ваш пол"
const ENTER_FILE = "Загрузите файл"
const SET_AVATAR = "Установка аватара"

const REQUIRED = "Это поле должно быть заполнено"
const MIN_DATE = "Минимальная дата - 1 января 1920 года"
const MAX_DATE = "Максимальная дата - 31 декабря 2017 года"
const NAME_LENGTH = "Значение поля должно быть длинной от 2 до 32 символов"
const NAME_OPTION = "Это поле должно состоять из букв латинницы или крилицы и не содержать пробелов"
const EMAIL_OPTION = "Email должен быть указан в формате domain@username.hostname"
const EMAIL_BUSY = "Указанный email занят другим пользователем"
const EMAIL_NOT_EXISTENCE = "Указанный email не действительный"



const EMAIL_REGEX = /[a-zA-Z0-9._%+-]{2,}@[a-zA-Z]{2,}(\.)[a-zA-Z]{1,}/
const NAME_REGEX = /[a-zA-Zа-яА-Я]/


const FIRSTNAME = "firstname"
const SURNAME = "surname"
const PARRENTNAME = "parrentname"
const EMAIL = "email"
const SEX = "sex"
const BIRTHDATE = "birthdate"
const AVATAR = "avatar"

const ARRAY_FORMATS = ["image/jpeg", "image/jpg", "image/png"]
const INVALIDATE_FORMAT = "Подходят только файлы формата .jpeg, .jpg, .png"
const INVALIDATE_SIZE = "Размер файла должен быть от 40kb до 5mb"

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
    AVATAR
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
    SET_AVATAR,
    EMAIL_BUSY,
    EMAIL_NOT_EXISTENCE
}