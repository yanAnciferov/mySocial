const RegistrationPageHeader = "Регистрация";
const StepAvatarHeader = "Установка аватара";
const ScaleTitle = "Масштаб:";
const LoadFile = "Загрузить файл";
const SkipButton = "Пропустить";
const NextButton = "Регистрация";
const PrevButton = "Назад";
const NextStep = "Далее";
const StepCommonInfoHeader = "Общая информация"

const NameLabel = "Имя"
const SurameLabel = "Фамилия"
const ParrentnameLabel = "Отчество"
const EmailLabel = "Почта"
const SexLabel = "Пол"
const BirthdateLabel = "Дата рождения"
const GoToProfile = "Перейти в профиль"

const Male = "Мужской"
const Female = "Женский"

const RegistrationLoad = "Идет регистрация" 

const FinalRegistration = "Завершение регистрации"
const LoadAvatar = "Загрузите или перетащите файл с изображением сюда"

function MessageAboutSuccesRegistration(firstname){
    return `Поздравляем вас, ${firstname}, вы успешно прошли регистрацию!`
}

function MessageAboutSendPassToMail(email){
    return `Пароль и логин был выслан вам на почту - ${email}`
}

export default {
    RegistrationPageHeader,
    StepAvatarHeader,
    ScaleTitle,
    LoadFile, 
    SkipButton,
    NextButton,
    PrevButton,
    StepCommonInfoHeader,
    NameLabel,
    SurameLabel,
    ParrentnameLabel,
    EmailLabel,
    SexLabel,
    BirthdateLabel,
    MessageAboutSendPassToMail,
    MessageAboutSuccesRegistration,
    GoToProfile,
    Male,
    Female,
    FinalRegistration,
    NextStep,
    RegistrationLoad,
    LoadAvatar
}