import Navigation from "../Navigation/Navigation.jsx";
import s from "./AppBar.module.css";

const AppBar = () => {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
};

export default AppBar;