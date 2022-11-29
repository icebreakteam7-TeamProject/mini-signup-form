// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. 페이지가 로드된 시점에 ID 입력창에 Focus가 되어있어야한다.
// ID input 창에 Addeventlistener를 추가해서 Focus를 설정해보자

const $id = document.getElementById('id')
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $submit = document.getElementById('submit')

window.addEventListener('load', () => $id.focus())

// 2. 유효성 검사 로직
// ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사를 수행해야 합니다.
// 유효성 검사 시점: input focus out시, 가입하기 버튼을 눌렀을 때
// 유효성 검사 패턴 : 모든 필드의 값은 빠짐 없이 입력해야함
/*
  ID : 5~20자, 영문 소문자, 숫자, 특수기호 (_) (-) 만 사용가능
  비밀번호 : 8 ~ 16자, 영문 대/소문자, 숫자 사용가능
  비밀번호 확인: 비밀번호와 일치
*/

// addEventListener를 사용해서 focusout되었을 때 유효성 검사를 실시하게 설정한다.
// 비어있을 때, 잘못 입력되었을때 2가지를 감지해야함
// ID : 5~20자, 영문 소문자, 숫자, 특수기호 (_) (-) 만 사용가능
var ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')

// 비밀번호 : 8 ~ 16자, 영문 대/소문자, 숫자 사용가능

var PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const validateId = () => {
    /*     if ($id.value.length === 0) {
        console.log(false)
    } else {
        console.log(ID_REGEX.test($id.value))
    } */

    const isValidate = $id.value.length == 0 ? false : ID_REGEX.test($id.value)
    console.log(isValidate)
    $pw.focus()
}

const validatePw = () => {
    const isValidate = $pw.value.length == 0 ? false : PW_REGEX.test($pw.value)
    console.log(isValidate)
    $pwCheck.focus()
}

//  비밀번호 확인: 비밀번호와 일치 여부 확인

const validatePwCheck = () => {
    const isValidate =
        $pwCheck.value.length == 0 ? false : $pw.value === $pwCheck.value
    console.log(isValidate)
}

$id.addEventListener('focusout', validateId)
$pw.addEventListener('focusout', validatePw)
$pwCheck.addEventListener('focusout', validatePwCheck)

// 가입하기 버튼을 눌렀을 때

const totalValidate = (e) => {
    e.preventDefault()
    validateId()
    validatePw()
    validatePwCheck()
}

$submit.addEventListener('click', totalValidate)
