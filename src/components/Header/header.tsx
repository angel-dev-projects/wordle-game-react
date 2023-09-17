import logo from "../../assets/imgs/wordle-logo.png";
import "./header.module.scss";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="Wordle Logo" />
    </header>
  );
}
