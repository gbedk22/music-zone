import React, {useState, useRef} from "react";

import Player from './components/Player';
import Song from './components/Song';
import "./styles/app.scss";
import data from "./songdata";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  //ref
  const audioRef = useRef(null);
  //state
  const [songs, setsongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0])
  //this is to check if a song is playing, so we create a state to to check that. 
  //so its set to false, so our music wuld not be playing.

  const [songInfo, setSongInfo] = useState ({
    currentTime: 0,
    duration: 0,

})

const[librarystatus, setlibrarystatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current =  e.target.currentTime;
    const duration = e.target.duration || 0;
    setSongInfo({...songInfo, currentTime: current, duration})
}

  
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className={`App ${librarystatus ? "library-active" : ""}`}>
      <Nav librarystatus={librarystatus} setlibrarystatus={setlibrarystatus}/>
      <Song currentSong={currentSong}/>
      <Player setIsPlaying={setIsPlaying} isPlaying={isPlaying} currentSong={currentSong} audioRef={audioRef} setSongInfo={setSongInfo} songInfo={songInfo} songs={songs} setcurrentSong={setcurrentSong} setsongs={setsongs}/>
      <Library songs={songs} setcurrentSong={setcurrentSong} audioRef={audioRef} isPlaying={isPlaying} setsongs={setsongs} librarystatus={librarystatus}/>
      <audio onTimeUpdate={timeUpdateHandler} onloadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;

