

const COUNT_BYTES_IN_KB = 1024;
const MAX_IMAGE_SIZE_IN_MB = 5;
const MAX_IMAGE_SOZE_IN_BYTE = (MAX_IMAGE_SIZE_IN_MB * COUNT_BYTES_IN_KB) * COUNT_BYTES_IN_KB
const MIN_IMAGE_SIZE_IN_KB = 40;
const MIN_IMAGE_SIZE_IN_BYTE = MIN_IMAGE_SIZE_IN_KB * COUNT_BYTES_IN_KB;

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]{2,}@[a-zA-Z]{2,}(\.)[a-zA-Z]{1,}/
const NAME_REGEX = /^[a-zA-Zа-яА-Я]+$/

const MIN = "1920-01-01"
const MAX = "2017-12-31"

const MALE = "male"
const FEMALE = "female"

const PATH_TO_USER_DATA = "./public/usersData/";
const SERVER_DOMAIN = "http://localhost:3001";
const PATH_TO_USER_DATA_FOR_CLIENT = "/usersData/";
const FULL_PATH_TO_USER_DATA = SERVER_DOMAIN + PATH_TO_USER_DATA_FOR_CLIENT;
const PATH_TO_DEFAULT_AVATAR = FULL_PATH_TO_USER_DATA + "default_avatar.png"

module.exports.IMAGE_SIZE = {
    COUNT_BYTES_IN_KB,
    MAX_IMAGE_SIZE_IN_MB,
    MAX_IMAGE_SOZE_IN_BYTE,
    MIN_IMAGE_SIZE_IN_KB,
    MIN_IMAGE_SIZE_IN_BYTE
}

const ARRAY_FORMATS = ["image/jpeg", "image/jpg", "image/png"]

module.exports.REGEX = {
    EMAIL_REGEX,
    NAME_REGEX
}


module.exports.DATE = {
    MIN,
    MAX
}

module.exports.SEX_TYPES = {
    MALE,
    FEMALE
}

module.exports.IMAGE = {
    ARRAY_FORMATS
}

module.exports.paths = {
    PATH_TO_USER_DATA,
    SERVER_DOMAIN,
    PATH_TO_USER_DATA,
    FULL_PATH_TO_USER_DATA,
    PATH_TO_DEFAULT_AVATAR,
    PATH_TO_USER_DATA_FOR_CLIENT
}
