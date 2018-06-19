var { IMAGE_SIZE, REGEX, SEX_TYPES, DATE, IMAGE } = require('../constants/common');
var { USER } = require("../constants/modelNames");
var { USER_ERRORS } = require("../constants/errors");
var { dateValidate,  imageValidation, nameValidate, sexValidate, rectValidation} = require("../scripts/validation");
var assert = require("assert")


describe('sexValidate', function() {
  it('should return object with isError: false and with message about enter when value = male', function() {
    assert.deepEqual(sexValidate('male'), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
  });

  it('should return object with isError: false and with message about enter when value = female', function() {
    assert.deepEqual(sexValidate('female'), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
  });

  it('should return object with isError: true and with message requred enter when value = empty string', function() {
    assert.deepEqual(sexValidate(''), {isError: true, messages:[USER_ERRORS.REQUIRED]});
  });

  it('should return object with isError: true and with message requred enter when value = eny string', function() {
    assert.deepEqual(sexValidate('sfsdfsdf'), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is null', function() {
    assert.deepEqual(sexValidate(null), {isError: true, messages:[USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is undefined', function() {
    assert.deepEqual(sexValidate(undefined), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(sexValidate({}), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is number', function() {
    assert.deepEqual(sexValidate(12), {isError: true, messages:[USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });
});



describe('dateValidate', function() {
  it('should return object with isError: false and with message about enter when value = 11-11-2012', function() {
    assert.deepEqual(dateValidate('11-11-2012'), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
  });

  it('should return object with isError: true and with message about max date when value is current date', function() {
    assert.deepEqual(dateValidate(new Date), {isError: true, messages: [USER_ERRORS.MAX_DATE]});
  });

  it('should return object with isError: true and with message about enter when value is most 31-12-2017', function() {
    assert.deepEqual(dateValidate(new Date("11-11-2020")), {isError: true, messages: [USER_ERRORS.MAX_DATE]});
  });

  it('should return object with isError: true and with message about enter when value is less 1-1-1920', function() {
    assert.deepEqual(dateValidate(new Date("1-1-1800")), {isError: true, messages: [USER_ERRORS.MIN_DATE]});
  });

  it('should return object with isError: true and with message requred enter when value is empty string', function() {
    assert.deepEqual(dateValidate(''), {isError: true, messages: [USER_ERRORS.REQUIRED]});
  });

  it('should return object with isError: true and with message requred enter when value is eny string', function() {
    assert.deepEqual(dateValidate('sfsdfsdf'), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is null', function() {
    assert.deepEqual(dateValidate(null), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is undefined', function() {
    assert.deepEqual(dateValidate(undefined), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(dateValidate({}), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(dateValidate(NaN), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when value is object', function() {
    assert.deepEqual(dateValidate(Infinity), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: false and with message about enter when value is number', function() {
    assert.deepEqual(dateValidate(12), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
  });
});


describe('nameValidate', function() {

  it('should return object with isError: true and with message about invalid param when no params ', function() {
    assert.deepEqual(nameValidate(), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when function taked only one param ', function() {
    assert.deepEqual(nameValidate("name"), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when function taked only two param', function() {
    assert.deepEqual(nameValidate("name", true), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when function taked nulls ', function() {
    assert.deepEqual(nameValidate(null, null, null), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when function taked undefines ', function() {
    assert.deepEqual(nameValidate(undefined, undefined, undefined), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when function taked any type for fieldType', function() {
    assert.deepEqual(nameValidate("Name", true, "Any"), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when function taked number for name and any type for fieldType', function() {
    assert.deepEqual(nameValidate(1, true, "Any"), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about invalid param when function taked number for name', function() {
    assert.deepEqual(nameValidate(1, true, "firstname"), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

  it('should return object with isError: true and with message about name length when function taked lenggth most 32 symb for name', function() {
    assert.deepEqual(nameValidate("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", true, "firstname"), {isError: true, messages: [USER_ERRORS.NAME_LENGTH]});
  });

  it('should return object with isError: false and with message about enter, when Name, true, "firstname" ', function() {
    assert.deepEqual(nameValidate("Name", true, "firstname"), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
  });

  it('should return object with isError: false and with message about enter when empty name, false, "parrentname" ', function() {
    assert.deepEqual(nameValidate("", false, "parrentname"), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
  });

  it('should return object with isError: false and with message about enter when empty name, false, "firstname"  ', function() {
    assert.deepEqual(nameValidate("", false, "firstname"), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
  });

  it('should return object with isError: true and with message about name option when name contained whitespace', function() {
    assert.deepEqual(nameValidate("   Name   ", false, "firstname"), {isError: true, messages: [USER_ERRORS.NAME_OPTION]});
  });

  it('should return object with isError: true and with message about invalide otion when for name taked object ', function() {
    assert.deepEqual(nameValidate({ name: "name"}, true, "firstname"), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
  });

});



describe('rectValidate', function() {

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation(), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
    });
  
    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation(true, {}), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation(null, {}), {isError: true, messages: [USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation(null, null), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation({}), {isError: true, messages: [USER_ERRORS.RECT_FORMAT_ERROR]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation({ x: 0,y: 0,width: 1,height: 1}), {isError: false, messages: [USER_ERRORS.NO_ERROR]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation({ x: "0",y: "0",width: 1,height: 1}), {isError: true, messages: [USER_ERRORS.RECT_FIELD_ERROR]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation({ x: "0",height: 1}), {isError: true, messages: [ USER_ERRORS.RECT_FORMAT_ERROR]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation("sdfsd", "sdfsd"), {isError: true, messages: [ USER_ERRORS.INVALIDATE_ENTRY_PARAM]});
    });

    it('should return object with isError: false and with message about invalid param when no params ', function() {
        assert.deepEqual(rectValidation("sdfsd"), {isError: false, messages: [ USER_ERRORS.NO_ERROR]});
    });

  });
  




