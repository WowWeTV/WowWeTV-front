import { useState } from 'react';
import styles from '@/styles/layout/register.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../lib/action/user';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    password: '',
    password_check: '',
    email: '',
    verify: '',
  });
  const [verifyNum, setVerifyNum] = useState();
  const [verifyInput, setVerifyInput] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [pwCheckErrMsg, setPwCheckErrMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [verifyErrorMsg, setVerifyErrorMsg] = useState('');
  const nameRe = /^[가-힣a-z]{3,10}$/;
  const passwordRe = /^[A-Za-z0-9]{6,10}$/;
  const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const verifyRe = /^[0-9]{6}$/;
  const onBlurName = () => {
    if (!inputs.name) {
      setNameErrorMsg('이름은 필수 정보입니다.');
    } else if (!nameRe.test(inputs.name)) {
      setNameErrorMsg('3~10자 한글과 영문 소문자만 사용하세요.');
    } else {
      setNameErrorMsg('');
    }
  };
  const onBlurPassword = () => {
    if (!inputs.password) {
      setPasswordErrorMsg('비밀번호는 필수 정보입니다.');
    } else if (!passwordRe.test(inputs.password)) {
      setPasswordErrorMsg('6~10자 영문 대/소문자와 숫자만 사용하세요.');
    } else {
      setPasswordErrorMsg('');
    }
  };
  const onBlurPasswordCheck = () => {
    if (!inputs.password_check) {
      setPwCheckErrMsg('비밀번호 확인은 필수 정보입니다.');
    } else if (inputs.password !== inputs.password_check) {
      setPwCheckErrMsg('비밀번호와 비밀번호 확인이 다릅니다.');
    } else {
      setPwCheckErrMsg('');
    }
  };
  const onBlurEmail = () => {
    if (!inputs.email) {
      setEmailErrorMsg('이메일은 필수 정보입니다.');
    } else if (!emailRe.test(inputs.email)) {
      setEmailErrorMsg('이메일 주소를 다시 확인해주세요.');
    } else {
      setEmailErrorMsg('');
    }
  };
  const onBlurVerify = () => {
    if (!inputs.verify) {
      setVerifyErrorMsg('인증번호는 필수 정보입니다.');
    } else if (!verifyRe.test(inputs.verify)) {
      console.log(verifyRe.test(inputs.verify));
      setVerifyErrorMsg('인증번호를 다시 확인해주세요.');
    } else {
      setVerifyErrorMsg('');
    }
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };
  const onSubmit = () => {
    onBlurEmail();
    onBlurName();
    onBlurPassword();
    onBlurPasswordCheck();
    onBlurVerify();
    setVerifyInput(true);
    if (
      nameRe.test(inputs.name) &&
      passwordRe.test(inputs.password) &&
      inputs.password === inputs.password_check &&
      emailRe.test(inputs.email) &&
      verifyNum.toString() === inputs.verify
    ) {
      console.log('Start function'); // 나중에 삭제
      const dataToSubmit = {
        userName: inputs.name,
        userEmail: inputs.email,
        password: inputs.password,
      };
      dispatch(registerUser(dataToSubmit)).then((response) => {
        console.log(response);
        if (response.result) {
          console.log(response.result);
        } else {
          console.log('dispatch fail');
        }
      });
    } else {
      console.log('Fail'); // 나중에 삭제
    }
  };
  const onEmailSubmit = async () => {
    if (!inputs.email) {
      setEmailErrorMsg('이메일을 입력해주세요.');
    } else {
      const vNum = Math.floor(Math.random() * 900000 + 100000);
      setVerifyNum(vNum);
      console.log(vNum); // 나중에 삭제
      // Add function
      setVerifyInput(true);
    }
  };
  return (
    <div className={styles.register_container}>
      <div className="input_group">
        <h3 className={styles.register_title}>
          <label htmlFor="name">이름</label>
        </h3>
        <div className={styles.input_area}>
          <span className={styles.input_box}>
            <input
              id="name"
              type="text"
              className={styles.register_input}
              value={inputs.name}
              onChange={onChange}
              onBlur={onBlurName}
            />
          </span>
        </div>
        {nameErrorMsg && <p>{nameErrorMsg}</p>}
      </div>
      <div className="input_group">
        <h3 className={styles.register_title}>
          <label htmlFor="password">비밀번호</label>
        </h3>
        <div className={styles.input_area}>
          <span className={styles.input_box}>
            <input
              id="password"
              type="password"
              className={styles.register_input}
              value={inputs.password}
              onChange={onChange}
              onBlur={onBlurPassword}
            />
          </span>
        </div>
        {passwordErrorMsg && <p>{passwordErrorMsg}</p>}
      </div>
      <div className="input_group">
        <h3 className={styles.register_title}>
          <label htmlFor="password_check">비밀번호 확인</label>
        </h3>
        <div className={styles.input_area}>
          <span className={styles.input_box}>
            <input
              id="password_check"
              type="password"
              className={styles.register_input}
              value={inputs.password_check}
              onChange={onChange}
              onBlur={onBlurPasswordCheck}
            />
          </span>
        </div>
        {pwCheckErrMsg && <p>{pwCheckErrMsg}</p>}
      </div>
      <div className="input_group">
        <h3 className={styles.register_title}>
          <label htmlFor="email">이메일</label>
        </h3>
        <div className={styles.email_input_area}>
          <span className={styles.input_box}>
            <input
              id="email"
              type="email"
              className={styles.register_input}
              value={inputs.email}
              onChange={onChange}
              onBlur={onBlurEmail}
            />
          </span>
          <button
            type="button"
            className={styles.btn_verify}
            onClick={onEmailSubmit}
          >
            인증번호 받기
          </button>
        </div>
        {emailErrorMsg && <p>{emailErrorMsg}</p>}
        {verifyInput && (
          <div className={cn(styles.input_area, styles.verify_input_box)}>
            <span className={styles.input_box}>
              <input
                id="verify"
                type="text"
                className={styles.register_input}
                placeholder="인증번호를 입력하세요."
                value={inputs.verify}
                onChange={onChange}
                onBlur={onBlurVerify}
              />
            </span>
          </div>
        )}
        {verifyErrorMsg && <p>{verifyErrorMsg}</p>}
      </div>

      <div>
        <button
          type="button"
          className={styles.register_form_button}
          onClick={onSubmit}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
