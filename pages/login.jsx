import styles from '../styles/Login.module.css';
import LogInComponent from '../components/login';
import { useEffect } from 'react';
import { getSessionToken } from '../utils/getSessionToken';
import { useRouter } from 'next/router';

const LogIn = () => {
  const router = useRouter();
  useEffect(() => {
    if (getSessionToken()) {
      router.push('/');
    }
  }, []);
  return (
    <section className={styles['main-container']}>
      <div className={styles.background}>
        <div className={styles['login-box']}>
          <div className={styles['logo-white']}></div>
          <LogInComponent />
        </div>
      </div>
    </section>
  );
};

export default LogIn;
