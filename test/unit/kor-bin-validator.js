'use strict';

var expect = require('chai').expect;
var validator = require('../../index');

describe('성공 테스트', function(){

    var num = '5365-1002-0075-1358';
    var result = validator.validate(num);
    var expected = true;
    var actual = result.valid;

    it('올바른 카드번호 [' + num + '] 입니다. \n정보 : ' + JSON.stringify(result.information), function(){
        expect(actual).to.equal(expected);
    });
})
