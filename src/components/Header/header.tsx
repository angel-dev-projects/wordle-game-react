import logo from "../../assets/imgs/wordle-logo.png";
import "./header.css";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="Wordle Logo" />
    </header>
  );
}
