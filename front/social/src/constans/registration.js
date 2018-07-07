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
const ENTER_PASSWORD = "Введите пароль"
const SET_AVATAR = "Установка аватара"

const REQUIRED = "Это поле должно быть заполнено"
const MIN_DATE = "Минимальная дата - 1 января 1920 года"
const MAX_DATE = "Максимальная дата - 31 декабря 2017 года"
const NAME_LENGTH = "Значение поля должно быть длинной от 2 до 32 символов"
const NAME_OPTION = "Это поле должно состоять из букв латинницы или крилицы и не содержать пробелов"
const EMAIL_OPTION = "Email должен быть указан в формате domain@username.hostname"
const EMAIL_BUSY = "Указанный email занят другим пользователем"
const EMAIL_NOT_EXISTENCE = "Указанный email не действительный"
const TECHNICAL_WORK_ON_SERVER = "Ведутся технические работы на сервере, простите за временные не удобства"
const FAILED_SEND_MESSAGE_TO_EMAIL = "Не удалось отправить сообщение на эту почту"
const USER_NOT_FOUND_ABOUT_EMAIL = "Пользователя с такой почтой не существует"
const INCORRECT_PASSWORD = "Не верный пароль"

const PASSWORD_LENGTH = "Длинна пароля должна быть от 6 до 32 символов";
const PASSWORD_DIFFERENT = "Пароли не совпадают";
const ENTER_NEW_PASSWORD = "Введите новый пароль";
const ENTER_OLD_PASSWORD = "Введите старый пароль";
const ENTER_CONFIRM_PASSWORD = "Подтвердите пароль";

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
const INVALIDATE_FORMAT = "Подходят только файлы формата .jpeg, .jpg, .png"
const INVALIDATE_SIZE = "Размер файла должен быть от 40kb до 5mb"


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