import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { loginUser } from '../../../lib/action/user';
import styles from '@/styles/layout/login.module.scss';

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [pwErrorMsg, setPwErrorMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { email, password } = inputs;
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const onChange = (e) => {
    const { value, id } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const onSubmit = () => {
    if (inputs.id === '') {
      setEmailErrorMsg('아이디를 입력해주세요.');
      setPwErrorMsg('');
      setErrorMsg('');
    } else if (inputs.password === '') {
      setPwErrorMsg('비밀번호를 입력해주세요.');
      setEmailErrorMsg('');
      setErrorMsg('');
    } else {
      setPwErrorMsg('');
      setEmailErrorMsg('');
      setErrorMsg('');
      const dataToSubmit = {
        userEmail: inputs.email,
        password: inputs.password,
      };
      dispatch(loginUser(dataToSubmit)).then((response) => {
        if (response.payload) {
          if (response.payload.success) {
            setCookie('token', response.payload.data.jwt);
            router.push(`/`);
          } else {
            console.log(response.payload);
            setErrorMsg(response.payload.message);
          }
        } else {
          alert('연결 오류');
        }
      });
      setEmailErrorMsg('');
      setPwErrorMsg('');
      // setErrorMsg('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.input_row}>
        <span>
          <input
            id="email"
            placeholder="이메일"
            type="text"
            value={email}
            onChange={onChange}
            className="text-input"
          />
        </span>
      </div>
      {emailErrorMsg && <p>{emailErrorMsg}</p>}
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
