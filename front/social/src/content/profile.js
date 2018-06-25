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
function getSex(sex){
    return sex === SEX_TYPES.MALE ? "Мужской" : "Женский"
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
    getSex
}