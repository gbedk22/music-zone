import React from 'react';
import {playAudio} from '../util';

const LibrarySong = ({song, songs, setcurrentSong, id, audioRef, isPlaying, setsongs}) => {
    //what we are doing is grabing all the songs and filter them out
    //this means "((state))", we have access to the state songs
    //and i want to make sure that the thing I am cliking on is equel to the one I have in my state. 

    //what this means, ${song.active ? 'selected' : "" }, check if the song.active is true or flase. 
    //if its active, add the selcted clas, if its not do not
    const songSelectHandler = () => {
       const selectedSong = songs.filter((state) => state.id ===id);
       setcurrentSong(selectedSong[0]);

       //add Active State
       const newSongs = songs.map((song) => {
           if(song.id === id){
               return{
                   ...song, active: true,
               }
           }else{
               return {
                   ...song, active: false,
               }
           }
       })
       setsongs(newSongs);
       //check if the song is playing

       playAudio(isPlaying, audioRef);
  
    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>

    )
}

export default LibrarySong;