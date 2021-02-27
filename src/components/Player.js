import React, {useRef, useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAlignRight, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";
import Song from './Song';
import {playAudio} from '../util';

const Player = ({currentSong, setIsPlaying, isPlaying, audioRef, setSongInfo, songInfo, songs, setcurrentSong, setsongs}) => {
    //event handler
    //usually, when you have an hyml tag i.e <audio><audio/> in this case,
    //if you want to reference it, yu usually use "const audio = document.querySelector('') "
    //in react, we use something called a refrence

    //useEffect
    useEffect(() => {
        const newSongs = songs.map((song) => {
            if(song.id === currentSong.id){
                return{
                    ...song, active: true,
                }
            }else{
                return {
                    ...song, active: false,
                }
            }
        });
        setsongs(newSongs);
    }, [currentSong]);


    //event handler
    const playSongHandler = () => {
        if (isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
       

        //state
        
        const getTime = (time) => {
            return(
                Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
            )
        }

        const dragHandler = (e) => {
            audioRef.current.currentTime = e.target.value;
            setSongInfo({ ...songInfo, currentTime: e.target.value });
        };

        const skipTrackerHandler = direction => {
            let currentIndex = songs.findIndex(song => song.id === currentSong.id);
            if (direction === 'skip-forward') {
                setcurrentSong(songs[currentIndex + 1] || songs[0]);
                playAudio(isPlaying, audioRef);
                return;
            } else if (direction === 'skip-back') {
                setcurrentSong(songs[currentIndex - 1] || songs[songs.length -1]);
            }
            playAudio(isPlaying, audioRef);
        };

        
        
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                <p>{getTime(songInfo.duration)}</p>

            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackerHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackerHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            

        </div>

    )
}

export default Player;