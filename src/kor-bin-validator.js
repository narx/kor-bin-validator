'use strict';


function validateResult(valid, message, information){
    return {valid: valid, message: message, information: information}
}

// https://en.wikipedia.org/wiki/Luhn_algorithm
function checkLuhn(num) {
   var numArray = num.split('');
   var checkDigit = numArray[numArray.length - 1];
   var sum = 0;

   numArray.forEach((digit, i) => {
        // 마지막 자리는 계산하지 않음
        if (i == numArray.length - 1) return;

        if (i%2) {  // 짝수
            sum += parseInt(digit);
        } else {    // 홀수
            let twice = parseInt(digit) * 2;
            if (twice > 9) {
                twice = twice % 10 + 1;
            }
            sum += twice;
        }
   });

   return sum * 9 % 10 == parseInt(checkDigit);
}



// function result(valid, )
function validate(param) {

    // 1. 트림
    var num = String(param).trim();
    
    // 2. 대쉬 제거
    num = num.replace(/-/gi, '');

    // 3. 숫자 여부 확인
    if (num.replace(/[0-9]/g, '').length !== 0){
        // 숫자아님 오류
        return validateResult(false, '문자가 포함되어있습니다.')
    }

    // 4. 자리수 확인
    if (num.length < 13 || num.length > 16) {
        // 사업자번호 자리수 오류
        return validateResult(false, '자리수가 맞지 않습니다.');
    }

    // 5. luhn 검증
    if (!checkLuhn(num)) {
        return validateResult(false, '잘못된 카드번호입니다.');
    }

    const information = getInformation(num);

    
    return validateResult(true, '올바른 카드번호입니다.', information);
}

function getInformation(param) {

    // https://www.kicc.co.kr/kr/support/pds/van/pds_van_list.jsp?s_menu=4&t_menu=1
    const binData = require('./bin-data.json');

    const informationRow = binData.find(o => {
        return param.indexOf(o[1]) === 0;
    });

    if (informationRow){
        const information = {
            publisher: informationRow[0],
            bin: informationRow[1],
            name: informationRow[2],
            owner: informationRow[3],
            brand: informationRow[4],
            type: informationRow[5]
        };
        
        return information;
    }
    else {
        return undefined;
    }
}



module.exports = validate;


