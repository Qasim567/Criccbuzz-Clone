import Navbar from './components/Navbar/Navbar';
import Matches from './components/Matches/Matches';
import Scoreboard from './components/Matches/Scoreboard';
import MatchInfo from './components/Matches/MatchInfo';
import MatchesSchedule from "./components/Matches/MatchesSchedule";
import Series from './components/Series/Series';
import Player from './components/Player/Player';
import PlayerDetail from './components/Player/PlayerDetail'
import MenRanking from './components/Ranking/MenRanking';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container my-3">
    <Routes>
      <Route exact path='/' element={<Matches/>}></Route>
      <Route exact path="/scoreboard/:matchId" element={<Scoreboard/>}></Route>
      <Route exact path="/matchinfo/:matchId" element={<MatchInfo/>}></Route>
      <Route exact path='/matchesschedule' element={<MatchesSchedule/>}></Route>
      <Route exact path='/series' element={<Series/>}></Route>
      <Route exact path='/player' element={<Player/>}></Route>
      <Route exact path="/player/:id" element={<PlayerDetail />} />
      <Route exact path="/rankingMen" element={<MenRanking />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
