import { Link } from "react-router-dom";
import yugiohLogo from "../assets/images/yugioh-logo.png";
import yugiKaibaBg from "../assets/images/yugi-kaiba-bg2.png";
import startAudio from "../assets/audio/time-to-duel.mp3";

const Home = () => {
  
  const timeToDuel = () => {
    new Audio(startAudio).play();
  }
  return (
    <>
      <div className="logo-container">
        <img src={yugiohLogo} alt="logo" className="logo" />
        <p>SPEED DUEL</p>
        <p>COMPANION</p>
      </div>
      <Link to="/game" className="duel-btn" onClick={timeToDuel}>START</Link>
      <img src={yugiKaibaBg} alt="yugi and kaiba" className="yugi-kaiba-bg"/>
    </>
  );
};

export default Home;