import PropertyConnected from "../propertyConnected";
import ConectProperty from "../conectProperty";
import styles from "./create.module.css";

const CreateStep = ({
  setShowPopUpAddContact,
  setShowPopUpCreateContact,
  isConnected,
  setIsCreated,
  recentContacts,
}) => {
  return (
    <div className={styles["crear"]}>
      <div className={styles["crear-tipo"]}>
        <div className={styles["creacion-title"]}>
          <span className={styles["tipo-title"]}>Fontana Campestre</span>
        </div>
        <div className={styles["tipo-unit"]}>
          <div className={styles["img-tipo"]}>
            <img src="/images/crear-tipo.png" />
          </div>
          <div className={styles["tipo-info"]}>
            <div className={styles["tipos"]}>
              <span>TIPO 1 - 102, 103</span>
              <span>TIPO 2 - 303, 305</span>
            </div>
            <span className={styles["valor"]}>
              $120 millones - 160 millones
            </span>
            <div className={styles["detalles"]}>
              <img src="/images/cards/bed.svg"  />
              <span>3-4</span>
              <img src="/images/cards/bath.svg"  />
              <span>2-3</span>
            </div>
          </div>
          <div className={styles["add"]}></div>
        </div>
      </div>
      {isConnected ? (
        <PropertyConnected setIsCreated={setIsCreated} />
      ) : (
        <ConectProperty
          recentContacts={recentContacts}
          setShowPopUpAddContact={setShowPopUpAddContact}
          setShowPopUpCreateContact={setShowPopUpCreateContact}
        />
      )}
    </div>
  );
};

export default CreateStep;
