// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. 페이지가 로드된 시점에 ID 입력창에 Focus가 되어있어야한다.
// ID input 창에 Addeventlistener를 추가해서 Focus를 설정해보자

const $id = document.getElementById('id')
const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $submit = document.getElementById('submit')
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')
const $modal = document.getElementById('modal')
const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')

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
var ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')

// 비밀번호 : 8 ~ 16자, 영문 대/소문자, 숫자 사용가능

var PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const validateId = () => {
    const isValidate =
        $id.value.length == 0 ? 'empty' : ID_REGEX.test($id.value)

    console.log(isValidate)
    // 3. 커스텀 오류 메시지
    // 유효하지 않은 input은 붉은 테두리 css border-red-600가 추가 되어야 한다.
    // 따라서 유효하지않은 input창의 style을 변경하고 하단의 하단의 id-msg창에 텍스트가 추가되어야 함
    $idMsg.innerText =
        isValidate == 'empty'
            ? '필수 정보입니다'
            : isValidate == false
            ? '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
            : ''

    isValidate == true
        ? $id.classList.remove('border-red-600')
        : $id.classList.add('border-red-600')

    return isValidate
}

const validatePw = () => {
    const isValidate =
        $pw.value.length == 0 ? 'empty' : PW_REGEX.test($pw.value)
    console.log(isValidate)

    $pwMsg.innerText =
        isValidate == 'empty'
            ? '필수 정보입니다'
            : isValidate == false
            ? '8~16자 영문 대 소문자, 숫자를 사용하세요.'
            : ''

    isValidate == true
        ? $pw.classList.remove('border-red-600')
        : $pw.classList.add('border-red-600')

    return isValidate
}

//  비밀번호 확인: 비밀번호와 일치 여부 확인

const validatePwCheck = () => {
    const isValidate =
        $pwCheck.value.length == 0 ? 'empty' : $pw.value === $pwCheck.value
    console.log(isValidate)

    $pwCheckMsg.innerText =
        isValidate == 'empty'
            ? '필수 정보입니다'
            : isValidate == false
            ? '비밀번호가 일치하지 않습니다.'
            : ''

    isValidate == true
        ? $pwCheck.classList.remove('border-red-600')
        : $pwCheck.classList.add('border-red-600')

    return isValidate
}

$id.addEventListener('focusout', validateId)
$pw.addEventListener('focusout', validatePw)
$pwCheck.addEventListener('focusout', validatePwCheck)

// 가입하기 버튼을 눌렀을 때

const totalValidate = (e) => {
    e.preventDefault()
    const idReady = validateId()
    const pwReady = validatePw()
    const pwCheckReady = validatePwCheck()
    // 4. 입력확인 모달창 제출하기 버튼을 클릭 시, 모든 input 값이 유효한 상태일 경우 입력한 아이디와 비밀번호를 확인할 수 있는 모달창 표시
    if (idReady == true && pwReady == true && pwCheckReady == true) {
        $modal.showModal()
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
    }
}

$submit.addEventListener('click', totalValidate)

$cancelBtn.addEventListener('click', () => {
    $modal.close()
})

// 가입하기 버튼을 클릭하면 alert 창이 나타남

const approveComplete = () => {
    window.alert('가입되었습니다 🥳')
    $modal.close()
    $id.value = ''
    $pw.value = ''
    $pwCheck.value = ''
}
$approveBtn.addEventListener('click', approveComplete)
