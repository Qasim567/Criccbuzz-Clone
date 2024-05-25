import Navbar from './components/Navbar/Navbar';
import Matches from './components/Matches/Matches';
import Scoreboard from './components/Matches/Scoreboard';
import MatchInfo from './components/Matches/MatchInfo';
import MatchesSchedule from "./components/Matches/MatchesSchedule";
import Archives from './components/Series/Archives';
import News from './components/News/News';
import Series from './components/Series/Series';
import Schedule from './components/Series/Schedule';
import PointTable from './components/Series/PointTable';
import Venues from './components/Series/Venues';
import Venue from './components/Venue/Venue';
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
      <Route exact path='/archives' element={<Archives/>}></Route>
      <Route exact path='/news' element={<News/>}></Route>
      <Route exact path='/series' element={<Series/>}></Route>
      <Route exact path='/seriesschedule/:id' element={<Schedule/>}></Route>
      <Route exact path='/pointstable/:id' element={<PointTable/>}></Route>
      <Route exact path='/venues/:id' element={<Venues/>}></Route>
      <Route exact path='/venue/:id' element={<Venue/>}></Route>
      <Route exact path='/player' element={<Player/>}></Route>
      <Route exact path="/player/:id" element={<PlayerDetail />} />
      <Route exact path="/rankingMen" element={<MenRanking />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
