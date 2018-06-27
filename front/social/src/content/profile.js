import { SEX_TYPES } from "../constans/registration";

const BIRTHDATE_INFO = "Дата рождения:";
const SEX_INFO = "Пол:"
const PAGE_NOT_FOUNT = "Страница не существует";
const MY_PAGE = "Моя страница"
const MY_FRIENDS = "Друзья"
const MY_NEWS = "Новости"
const SEARCH = "Поиск"
const SETTINGS = "Настройки"
const EMAIL_INFO = "Почта:"
const UPDATE_DATA_LOAD = "Обновляем ваши данные"
const UPDATE_AVATAR_LOAD = "Обновляем ваш аватар"
const MAIL_CONTENT = "Мужской";
const FEMAIL_CONTENT = "Женский";
const MAIN_INFO = "Основная информация"

function getSex(sex){
    return sex === SEX_TYPES.MALE ? MAIL_CONTENT : FEMAIL_CONTENT
}

function getFullName({firstname, surname, parrentname}){
    return parrentname ? `${surname} ${firstname} ${parrentname}` : ` ${firstname} ${surname}`
}

export const PROFILE_CONTENT = {
    PAGE_NOT_FOUNT,
    MY_PAGE,
    MY_FRIENDS,
    MY_NEWS,
    SEARCH,
    SETTINGS,
    BIRTHDATE_INFO,
    SEX_INFO,
    EMAIL_INFO,
    UPDATE_DATA_LOAD,
    UPDATE_AVATAR_LOAD,
    MAIN_INFO,
    getSex,
    getFullName
}