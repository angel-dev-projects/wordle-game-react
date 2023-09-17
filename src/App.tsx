import Wordle from "./components/Wordle/wordle";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header></Header>
      <Wordle></Wordle>
      <Footer></Footer>
    </>
  );
}

export default App;
