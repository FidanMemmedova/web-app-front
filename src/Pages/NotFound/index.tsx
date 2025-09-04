import { useNavigate } from "react-router-dom";
import style from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>404</h1>
      <p className={style.message}>Page not found.</p>
      <button className={style.goHomeBtn} onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
