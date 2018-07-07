const COUNT_BYTES_IN_KB = 1024;
const MAX_IMAGE_SIZE_IN_MB = 5;
const MAX_IMAGE_SOZE_IN_BYTE = (MAX_IMAGE_SIZE_IN_MB * COUNT_BYTES_IN_KB) * COUNT_BYTES_IN_KB
const MIN_IMAGE_SIZE_IN_KB = 40;
const MIN_IMAGE_SIZE_IN_BYTE = MIN_IMAGE_SIZE_IN_KB * COUNT_BYTES_IN_KB;
const COUNT_MILLISECONDS_IN_YEAR = 24 * 3600 * 365.25 * 1000;

const MAX_TEXT_SIZE = 2048;
const MIN_TEXT_SIZE = 1;

const UNEXPECTED_ERROR_MESSAGE = "Не известная ошибка сервера"
const ON_AUTHORIZATION = "Идет авторизация"

const FRIENDS = "/friends";
const SEARCH = "/search";
const FEED = "/feed";
const REGISTRATION = "/registration";
const SETTINGS = "/settings";
const LOGIN = "/login";
const EDIT = "/edit";
const ID = "/:id";
const DEFAULT = "/";

const getUrlToMyPage = (id) => {
    return `/${id}`
}

const getUrlToMyFriends = (id) => {
    return `/${id}${FRIENDS}`
}


export const IMAGE_SIZE = {
    COUNT_BYTES_IN_KB,
    MAX_IMAGE_SIZE_IN_MB,
    MAX_IMAGE_SOZE_IN_BYTE,
    MIN_IMAGE_SIZE_IN_KB,
    MIN_IMAGE_SIZE_IN_BYTE
}

export const COMMON_MESSAGE = {
    UNEXPECTED_ERROR_MESSAGE,
    ON_AUTHORIZATION
}

export const TIME = {
    COUNT_MILLISECONDS_IN_YEAR
}

export const MENU_LINKS = {
    FRIENDS, 
    SEARCH,
    FEED,
    EDIT,
    LOGIN,
    ID,
    DEFAULT,
    SETTINGS,
    REGISTRATION,
    getUrlToMyPage,
    getUrlToMyFriends
}

export const TEXT_PARAMS = {
    MAX_TEXT_SIZE,
    MIN_TEXT_SIZE
}