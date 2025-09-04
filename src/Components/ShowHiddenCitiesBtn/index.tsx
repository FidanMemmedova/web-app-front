import { useNavigate } from "react-router-dom";
import style from "./ShowHiddenCitiesBtn.module.scss";

interface Props {
  hiddenCount: number;
}

const ShowHiddenCitiesBtn = ({ hiddenCount }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={style.showHiddenButtonWrapper}>
      <button
        className={style.showHiddenButton}
        onClick={() => navigate("/hidden")}
        disabled={hiddenCount === 0}
      >
        Show Hidden Cities ({hiddenCount})
      </button>
    </div>
  );
};

export default ShowHiddenCitiesBtn;
