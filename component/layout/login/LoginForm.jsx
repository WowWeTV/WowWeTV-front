import { useState } from 'react';
import styles from '@/styles/layout/login.module.scss';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    name: '',
    password: '',
  });
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { name, password } = inputs;

  const onChange = (e) => {
    const { value, id } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const onSubmit = () => {
    if (inputs.id === '') {
      setNameErrorMsg('아이디를 입력해주세요.');
      setPwErrorMsg('');
      setErrorMsg('');
    } else if (inputs.password === '') {
      setPwErrorMsg('비밀번호를 입력해주세요.');
      setNameErrorMsg('');
      setErrorMsg('');
    } else {
      // Add function
      setErrorMsg('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
      setNameErrorMsg('');
      setPwErrorMsg('');
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.input_row}>
        <span>
          <input
            id="name"
            placeholder="아이디"
            type="text"
            value={name}
            onChange={onChange}
            className="text-input"
          />
        </span>
      </div>
      {nameErrorMsg && <p>{nameErrorMsg}</p>}
      <div className={styles.input_row}>
        <span>
          <input
            id="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChange}
            className="text-input"
          />
        </span>
      </div>
      {pwErrorMsg && <p>{pwErrorMsg}</p>}
      {errorMsg && <p>{errorMsg}</p>}

      <div>
        <button type="button" className="login_form_button" onClick={onSubmit}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
