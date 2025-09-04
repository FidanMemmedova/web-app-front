import style from "./RetryBtn.module.scss";

type RetryBtnProps = {
  onRetry: () => void;
  message?: string;
};

const RetryBtn = ({ onRetry, message }: RetryBtnProps) => (
  <div className={style.retryWrapper}>
    {message && <p className={style.retryMessage}>{message}</p>}
    <button className={style.retryButton} onClick={onRetry}>
      Retry
    </button>
  </div>
);

export default RetryBtn;
