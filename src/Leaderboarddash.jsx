import Footer1 from "./Components/Footer";
import Leaderboard from "./Components/LeaderBoard";
import Navbar from "./Components/Navbar";
import styles from "./leaderboarddash.module.css";
function LeaderBoarddash() {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.leaderdash}>
        <Leaderboard></Leaderboard>
      </div>

      <Footer1></Footer1>
    </>
  );
}
export default LeaderBoarddash;
