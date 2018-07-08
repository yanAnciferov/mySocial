import { SEX_TYPES } from "../constans/registration";
import { TIME } from "../constans/common";

const BIRTHDATE_INFO = "Birthdate";
const SEX_INFO = "Gender";
const PAGE_NOT_FOUNT = "Page is not found";
const MY_PAGE = "My page";
const MY_FRIENDS = "Friends";
const MY_NEWS = "News";
const SEARCH = "Search";
const SETTINGS = "Settings";
const EMAIL_INFO = "Email";
const UPDATE_DATA_LOAD = "Updating your data";
const UPDATE_AVATAR_LOAD = "Updating your avatar";
const MAIL_CONTENT = "Male";
const FEMAIL_CONTENT = "Female";
const MAIN_INFO = "Main information";
const UPDATE_AVATAR = "Update avatar";
const AGE_INFO = "Age";
const PICK_AVATAR = "Load avatar";
const NEWS_NOT_FOUND = "There is no news in your news feed";
const WHATS_APP = "Whats app?";

function getSex(sex){
    return sex === SEX_TYPES.MALE ? MAIL_CONTENT : FEMAIL_CONTENT
}

function getFullName({firstname, surname, parrentname}){
    return parrentname ? `${surname} ${firstname} ${parrentname}` : ` ${firstname} ${surname}`
}

function getAge(date){
    return `${((new Date().getTime() - new Date(date)) / (TIME.COUNT_MILLISECONDS_IN_YEAR)) | 0} лет`;
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
    UPDATE_AVATAR,
    PICK_AVATAR,
    AGE_INFO,
    NEWS_NOT_FOUND,
    WHATS_APP,
    getSex,
    getFullName,
    getAge
}