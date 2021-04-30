import { useState } from 'react';
import styles from '@/styles/layout/my.module.scss';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const UserInfo = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [nameInput, setNameInput] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const [inputs, setInputs] = useState({
    img: userInfo.userImg,
    name: userInfo.userName,
    email: userInfo.userEmail,
    verify: '',
    password: '',
    new_password: '',
    new_password_check: '',
  });
  const onChange = (e) => {
    const { value, id } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };
  const [verifyNum, setVerifyNum] = useState();
  const [verifyInput, setVerifyInput] = useState(false);
  const [emailInputDis, setEmailInputDis] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState('');
  const [newPwCheckErrMsg, setNewPwCheckErrMsg] = useState('');
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
  const onNameInput = () => {
    setNameInput(!nameInput);
  };
  const submitNameInput = () => {
    onBlurName();
    if (!nameErrorMsg) setNameInput(!nameInput);
    else console.log(1);
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
  const onEmailInput = () => {
    setEmailInput(!emailInput);
  };
  const onEmailSubmit = async () => {
    if (!inputs.email) {
      setEmailErrorMsg('이메일을 입력해주세요.');
    } else if (!emailRe.test(inputs.email)) {
      setEmailErrorMsg('이메일 주소를 다시 확인해주세요.');
    } else {
      const vNum = Math.floor(Math.random() * 900000 + 100000);
      setVerifyNum(vNum);
      setEmailInputDis(true);
      console.log(vNum); // 나중에 삭제
      // Add function
      setVerifyInput(true);
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
  const submitVerifyInput = () => {
    onBlurVerify();
    if (inputs.verify !== verifyNum.toString()) {
      setVerifyErrorMsg('인증번호를 다시 확인해주세요.');
    } else if (inputs.verify && verifyRe.test(inputs.verify)) {
      setEmailInput(!emailInput);
      setVerifyInput(false);
    } else console.log(1);
  };
  const onBlurPassword = () => {
    if (!inputs.password) {
      setPasswordErrorMsg('비밀번호는 필수 정보입니다.');
    } else {
      setPasswordErrorMsg('');
    }
  };
  const onBlurNewPassword = () => {
    if (!inputs.new_password) {
      setNewPasswordErrorMsg('새 비밀번호는 필수 정보입니다.');
    } else if (!passwordRe.test(inputs.new_password)) {
      setNewPasswordErrorMsg('6~10자 영문 대/소문자와 숫자만 사용하세요.');
    } else {
      setNewPasswordErrorMsg('');
    }
  };
  const onBlurNewPwCheck = () => {
    if (!inputs.new_password_check) {
      setNewPwCheckErrMsg('새 비밀번호 확인은 필수 정보입니다.');
    } else if (inputs.new_password !== inputs.new_password_check) {
      setNewPwCheckErrMsg('비밀번호와 비밀번호 확인이 다릅니다.');
    } else {
      setNewPwCheckErrMsg('');
    }
  };
  const onPasswordInput = () => {
    setPasswordInput(!passwordInput);
  };
  const submitPasswordInput = () => {
    onBlurPassword();
    onBlurNewPassword();
    onBlurNewPwCheck();
    if (
      inputs.password &&
      inputs.new_password &&
      passwordRe.test(inputs.new_password) &&
      inputs.new_password_check &&
      inputs.new_password === inputs.new_password_check
    )
      setPasswordInput(!passwordInput);
    else console.log(1);
  };
  const removeAccount = () => {
    // add function
    alert('계정이 삭제되었습니다.');
  };

  return (
    <>
      <div className={styles.user_info_container}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <h2>
              <strong>유저 정보</strong>
            </h2>
          </div>
          <div>
            <div className={styles.user_img_name}>
              <div className={styles.thumnail_area}>
                <img src={inputs.img} alt="userImg" />
                <label htmlFor="img_upload" className={styles.img_upload_btn}>
                  이미지 업로드
                </label>
                <input
                  type="file"
                  id="img_upload"
                  className={styles.img_upload_input}
                />
                <button className={styles.img_remove}>이미지 제거</button>
              </div>
              <div className={styles.info_area}>
                <h2>이름</h2>
                <div className={styles.info_content}>
                  {!nameInput && (
                    <>
                      <p>{inputs.name}</p>
                      <button
                        className={styles.edit_button}
                        onClick={onNameInput}
                      >
                        수정
                      </button>
                    </>
                  )}
                  {nameInput && (
                    <form className={styles.form_area}>
                      <input
                        id="name"
                        type="text"
                        value={inputs.name}
                        onChange={onChange}
                        onBlur={onBlurName}
                        placeholder="3~10자 한글과 영문 소문자"
                      />
                      <button
                        type="button"
                        className={styles.name_input_btn}
                        onClick={submitNameInput}
                      >
                        저장
                      </button>
                    </form>
                  )}
                </div>
                {nameErrorMsg && nameInput && (
                  <p className={styles.errorMsg}>{nameErrorMsg}</p>
                )}
              </div>
            </div>
            <div className={styles.other_info}>
              <div className={styles.wrapper}>
                <div>
                  <h3 className={styles.title_header}>이메일 주소</h3>
                </div>
                <div className={styles.info_wrapper}>
                  {!emailInput && (
                    <>
                      <span>{inputs.email}</span>
                      <div className={styles.edit_wrapper}>
                        <button
                          className={styles.edit_button}
                          onClick={onEmailInput}
                        >
                          수정
                        </button>
                      </div>
                    </>
                  )}
                  {emailInput && (
                    <form className={styles.form_area}>
                      <input
                        id="email"
                        type="text"
                        value={inputs.email}
                        disabled={emailInputDis}
                        onChange={onChange}
                        placeholder="인증번호"
                        onBlur={onBlurEmail}
                      />
                      <button
                        type="button"
                        className={styles.email_input_btn}
                        onClick={onEmailSubmit}
                      >
                        인증번호 전송
                      </button>
                    </form>
                  )}
                </div>
                {emailErrorMsg && emailInput && (
                  <p className={styles.errorMsg}>{emailErrorMsg}</p>
                )}
                {verifyInput && (
                  <form className={styles.form_area}>
                    <input
                      id="verify"
                      type="text"
                      value={inputs.verify}
                      onChange={onChange}
                      onBlur={onBlurVerify}
                    />
                    <button
                      type="button"
                      className={styles.name_input_btn}
                      onClick={submitVerifyInput}
                    >
                      확인
                    </button>
                  </form>
                )}
              </div>
              {verifyErrorMsg && (
                <p className={styles.errorMsg}>{verifyErrorMsg}</p>
              )}
            </div>
            <div className={classNames(styles.other_info, styles.border_top)}>
              <div className={styles.wrapper}>
                <div className={styles.password_header_area}>
                  <span>비밀번호</span>
                  {!passwordInput && (
                    <button
                      className={styles.edit_button}
                      onClick={onPasswordInput}
                    >
                      수정
                    </button>
                  )}
                </div>
                {passwordInput && (
                  <form className={styles.password_form_area}>
                    <input
                      id="password"
                      type="password"
                      value={inputs.password}
                      onChange={onChange}
                      onBlur={onBlurPassword}
                      placeholder="현재 비밀번호"
                    />
                    {passwordErrorMsg && (
                      <p
                        className={classNames(
                          styles.errorMsg,
                          styles.password_input_margin,
                        )}
                      >
                        {passwordErrorMsg}
                      </p>
                    )}
                    <input
                      id="new_password"
                      type="password"
                      value={inputs.new_password}
                      onChange={onChange}
                      onBlur={onBlurNewPassword}
                      placeholder="새 비밀번호"
                    />
                    {newPasswordErrorMsg && (
                      <p
                        className={classNames(
                          styles.errorMsg,
                          styles.password_input_margin,
                        )}
                      >
                        {newPasswordErrorMsg}
                      </p>
                    )}
                    <input
                      id="new_password_check"
                      type="password"
                      value={inputs.new_password_check}
                      onChange={onChange}
                      onBlur={onBlurNewPwCheck}
                      placeholder="새 비밀번호 확인"
                    />
                    {newPwCheckErrMsg && (
                      <p
                        className={classNames(
                          styles.errorMsg,
                          styles.password_input_margin,
                        )}
                      >
                        {newPwCheckErrMsg}
                      </p>
                    )}
                    <button type="button" onClick={submitPasswordInput}>
                      저장
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className={classNames(styles.other_info, styles.border_top)}>
              <div className={styles.wrapper}>
                <span>회원탈퇴</span>
                <div className={styles.delete_account_area}>
                  <Link href="/login">
                    <button
                      className={styles.delete_account_btn}
                      onClick={removeAccount}
                    >
                      계정 삭제
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
