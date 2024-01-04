import OportunitiesAll from '../../components/oportunitiesAll';
import OportunitiesPending from '../../components/oportunitiesPending';
import OportunitiesClosed from '../../components/oportunitiesClosed';
import styles from '../../styles/Oportunities-All.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreateOportunity from '../../components/createOportunity';
import { getSessionToken } from '../../utils/getSessionToken';
import opportunities from '../api/opportunities';

const OportunitiesAllFilter = () => {
  const router = useRouter();
  const { id } = useSelector((state) => state.userState);
  const [showBar, setShowBar] = useState(false);
  const [showSection, setShowSection] = useState('all');
  const [allOpportunities, setAllOpportunities] = useState([]);
  const [recentContacts, setRecentsContacts] = useState([]);

  const toggleShowBar = () => {
    setShowBar(!showBar);
  };

  const { openPopUpOportunity } = useSelector(
    (state) => state.popUpOportunityState
  );

  const getAllOpportunities = async () => {
    const response = await fetch('/api/opportunities', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        idProject: '',
        idClient: '',
      }),
    });

    const opportunitiesResponse = await response.json();
    console.log('dentro de opotunidades:', opportunitiesResponse);
    setAllOpportunities(opportunitiesResponse);
  };

  const getRecentsContacts = async () => {
    const response = await fetch('/api/recentsContacts', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const recentsContacts = await response.json();
    console.log('Contactos en oportunidades:', recentsContacts);
    setRecentsContacts(recentsContacts);
  };

  useEffect(() => {
    if (!getSessionToken()) {
      router.push('/login');
      getRecentsContacts();
      return;
    }
    getAllOpportunities();
    getRecentsContacts();
  }, []);

  return (
    <>
      <div className={styles['top-content-buttonsBar']}>
        <div className="container flex j-s a-c">
          <div className={styles['top-buttons-container']}>
            <div className={styles['top-content-container']}>
              <button
                className={styles['top-content-buttons']}
                onClick={() => setShowSection('all')}>
                TODAS
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'all' && styles.active
                }`}></div>
            </div>
            <div className={styles['top-content-container']}>
              <button
                className={styles['top-content-buttons']}
                onClick={() => setShowSection('pending')}>
                PENDIENTES
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'pending' && styles.active
                }`}></div>
            </div>
            <div className={styles['top-content-container']}>
              <button
                className={styles['top-content-buttons']}
                onClick={() => setShowSection('closed')}>
                CERRADAS
              </button>
              <div
                className={`${styles['top-content-bar']} ${
                  showSection === 'closed' && styles.active
                }`}></div>
            </div>
          </div>
          {showSection === 'all' && (
            <div className={styles.filter_container}>
              <label htmlFor="subject"></label>
              <select
                placeholder="Subject line"
                name="subject"
                className={styles.filter_input}>
                <option>MAS CALIENTE</option>
                <option>MAS FRÍA</option>
                <option selected>MAS RECIENTE</option>
                <option>MENOS RECIENTE</option>
              </select>
              <span className={styles.label_filter}>Ordenar por:</span>
            </div>
          )}
        </div>
      </div>
      <section className={styles.main}>
        <div className="container flex j-sb a-s wrap">
          {showSection === 'all' && (
            <OportunitiesAll
              oppList={allOpportunities}
              contacts={recentContacts}
            />
          )}
          {showSection === 'pending' && (
            <OportunitiesPending oppList={allOpportunities} />
          )}
          {showSection === 'closed' && (
            <OportunitiesClosed
              oppList={allOpportunities}
              contacts={recentContacts}
            />
          )}
        </div>
      </section>

      {openPopUpOportunity && (
        <CreateOportunity created={true} recentContacts={recentContacts} />
      )}
    </>
  );
};

export default OportunitiesAllFilter;
