const RegistrationPageHeader = "Registration";
const StepAvatarHeader = "Load avatar";
const ScaleTitle = "Scale";
const LoadFile = "Upload file";
const SkipButton = "Skip";
const NextButton = "Registration";
const PrevButton = "Back";
const NextStep = "Next";
const StepCommonInfoHeader = "Common information"

const NameLabel = "Name"
const SurameLabel = "Surname"
const ParrentnameLabel = "Parrentname"
const EmailLabel = "Email"
const SexLabel = "Gender"
const BirthdateLabel = "Birthdate"
const GoToProfile = "Go to profile"

const Male = "Male"
const Female = "Female"

const RegistrationLoad = "There is a registration" 

const FinalRegistration = "Final of registartion"
const LoadAvatar = "Upload or drag the image file here"

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