var { MESSAGE, REGEX, SEX_TYPES, IMAGE, DATE } =  require("../src/constans/registration");
var {dateValidate, emailValidate, imageValidation, nameValidate, sexValidate} = require("../src/components/pages/registration/validate");
var assert = require("assert")


describe('sexValidate', function() {
  it('should return object with isError: false and with message about enter when value = male', function() {
    assert.deepEqual(sexValidate('male'), {isError: false, message: MESSAGE.ENTER_SEX});
  });

  it('should return object with isError: false and with message about enter when value = female', function() {
    assert.deepEqual(sexValidate('female'), {isError: false, message: MESSAGE.ENTER_SEX});
  });

  it('should return object with isError: true and with message requred enter when value = empty string', function() {
    assert.deepEqual(sexValidate(''), {isError: true, message: MESSAGE.REQUIRED});
  });

  it('should return object with isError: true and with message requred enter when value = eny string', function() {
    assert.deepEqual(sexValidate('sfsdfsdf'), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is null', function() {
    assert.deepEqual(sexValidate(null), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is undefined', function() {
    assert.deepEqual(sexValidate(undefined), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(sexValidate({}), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is number', function() {
    assert.deepEqual(sexValidate(12), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });
});



describe('dateValidate', function() {
  it('should return object with isError: false and with message about enter when value = 11-11-2012', function() {
    assert.deepEqual(dateValidate('11-11-2012'), {isError: false, message: MESSAGE.ENTER_BIRTHDATE});
  });

  it('should return object with isError: true and with message about max date when value is current date', function() {
    assert.deepEqual(dateValidate(new Date), {isError: true, message: MESSAGE.MAX_DATE});
  });

  it('should return object with isError: true and with message about enter when value is most 31-12-2017', function() {
    assert.deepEqual(dateValidate(new Date("11-11-2020")), {isError: true, message: MESSAGE.MAX_DATE});
  });

  it('should return object with isError: true and with message about enter when value is less 1-1-1920', function() {
    assert.deepEqual(dateValidate(new Date("1-1-1800")), {isError: true, message: MESSAGE.MIN_DATE});
  });

  it('should return object with isError: true and with message requred enter when value is empty string', function() {
    assert.deepEqual(dateValidate(''), {isError: true, message: MESSAGE.REQUIRED});
  });

  it('should return object with isError: true and with message requred enter when value is eny string', function() {
    assert.deepEqual(dateValidate('sfsdfsdf'), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is null', function() {
    assert.deepEqual(dateValidate(null), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is undefined', function() {
    assert.deepEqual(dateValidate(undefined), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(dateValidate({}), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(dateValidate(NaN), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(dateValidate(Infinity), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: false and with message about enter when value is number', function() {
    assert.deepEqual(dateValidate(12), {isError: false, message: MESSAGE.ENTER_BIRTHDATE});
  });
});



describe('emailValidate', function() {
  it('should return object with isError: true and with message about enter when no value', function() {
    assert.deepEqual(emailValidate(), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about enter when value is date string', function() {
    assert.deepEqual(emailValidate('11-11-2012'), {isError: true, message: MESSAGE.EMAIL_OPTION});
  });

  it('should return object with isError: true and with message about max date when value is current date', function() {
    assert.deepEqual(emailValidate(new Date), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message requred enter when value is empty string', function() {
    assert.deepEqual(emailValidate(''), {isError: true, message: MESSAGE.REQUIRED});
  });

  it('should return object with isError: true and with message requred enter when value is eny string', function() {
    assert.deepEqual(emailValidate('sfsdfsdf'), {isError: true, message: MESSAGE.EMAIL_OPTION});
  });

  it('should return object with isError: true and with message about invalid param when value is null', function() {
    assert.deepEqual(emailValidate(null), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is undefined', function() {
    assert.deepEqual(emailValidate(undefined), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(emailValidate({}), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is Nan', function() {
    assert.deepEqual(emailValidate(NaN), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when value is infinity', function() {
    assert.deepEqual(emailValidate(Infinity), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about enter when value is number', function() {
    assert.deepEqual(emailValidate(12), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about email otion ', function() {
    assert.deepEqual(emailValidate("yan"), {isError: true, message: MESSAGE.EMAIL_OPTION});
  });

  it('should return object with isError: true and with message about email otion ', function() {
    assert.deepEqual(emailValidate("yan@"), {isError: true, message: MESSAGE.EMAIL_OPTION});
  });

  it('should return object with isError: true and with message about email otion ', function() {
    assert.deepEqual(emailValidate("yan@gmail"), {isError: true, message: MESSAGE.EMAIL_OPTION});
  });

  it('should return object with isError: false and with message about email otion ', function() {
    assert.deepEqual(emailValidate("yan@gmail.com"), {isError: false, message: MESSAGE.ENTER_EMAIL});
  });

  
  it('should return object with isError: false and with message about email otion ', function() {
    assert.deepEqual(emailValidate("ya.n@gmail.com"), {isError: false, message: MESSAGE.ENTER_EMAIL});
  });


});


describe('nameValidate', function() {

  it('should return object with isError: true and with message about invalid param when no params ', function() {
    assert.deepEqual(nameValidate(), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when function taked only one param ', function() {
    assert.deepEqual(nameValidate("name"), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when function taked only two param', function() {
    assert.deepEqual(nameValidate("name", true), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when function taked nulls ', function() {
    assert.deepEqual(nameValidate(null, null, null), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when function taked undefines ', function() {
    assert.deepEqual(nameValidate(undefined, undefined, undefined), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when function taked any type for fieldType', function() {
    assert.deepEqual(nameValidate("Name", true, "Any"), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when function taked number for name and any type for fieldType', function() {
    assert.deepEqual(nameValidate(1, true, "Any"), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about invalid param when function taked number for name', function() {
    assert.deepEqual(nameValidate(1, true, "firstname"), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

  it('should return object with isError: true and with message about name length when function taked lenggth most 32 symb for name', function() {
    assert.deepEqual(nameValidate("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", true, "firstname"), {isError: true, message: MESSAGE.NAME_LENGTH});
  });

  it('should return object with isError: false and with message about enter, when Name, true, "firstname" ', function() {
    assert.deepEqual(nameValidate("Name", true, "firstname"), {isError: false, message: MESSAGE.ENTER_NAME});
  });

  it('should return object with isError: false and with message about enter when empty name, false, "parrentname" ', function() {
    assert.deepEqual(nameValidate("", false, "parrentname"), {isError: false, message: MESSAGE.ENTER_PARRENTNAME});
  });

  it('should return object with isError: false and with message about enter when empty name, false, "firstname"  ', function() {
    assert.deepEqual(nameValidate("", false, "firstname"), {isError: false, message: MESSAGE.ENTER_NAME});
  });

  it('should return object with isError: true and with message about name option when name contained whitespace', function() {
    assert.deepEqual(nameValidate("   Name   ", false, "firstname"), {isError: true, message: MESSAGE.NAME_OPTION});
  });

  it('should return object with isError: true and with message about invalide otion when for name taked object ', function() {
    assert.deepEqual(nameValidate({ name: "name"}, true, "firstname"), {isError: true, message: MESSAGE.INVALIDATE_ENTRY_PARAM});
  });

});


