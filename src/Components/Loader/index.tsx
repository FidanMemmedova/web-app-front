import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default Loader;
