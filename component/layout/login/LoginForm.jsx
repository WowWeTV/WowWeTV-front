import { useState } from 'react';
import styles from '@/styles/layout/login.module.scss';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });
  const [idErrorMsg, setIdErrorMsg] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { id, password } = inputs;

  const onChange = (e) => {
    const { value, id } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const onSubmit = () => {
    if (inputs.id === '') {
      setIdErrorMsg('아이디를 입력해주세요.');
      setPwErrorMsg('');
      setErrorMsg('');
    } else if (inputs.password === '') {
      setPwErrorMsg('비밀번호를 입력해주세요.');
      setIdErrorMsg('');
      setErrorMsg('');
    } else {
      // Add function
      setErrorMsg('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
      setIdErrorMsg('');
      setPwErrorMsg('');
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.input_row}>
        <span>
          <input
            id="id"
            placeholder="아이디"
            type="text"
            value={id}
            onChange={onChange}
            className="text-input"
          />
        </span>
      </div>
      {idErrorMsg && <p>{idErrorMsg}</p>}
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
        <button className="login_form_button" onClick={onSubmit}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
