// Dependencies
// React
import {useState, React}       from "react"       ;

// Redux
import { useSelector,
         useDispatch } from "react-redux"               ;
import { createStamp } from '../../Redux/stampReducer'  ;

// Component
import ControlsComponent from "./ControlsComponent.js" ;

// Style
import './Controls.scss' ;



const ControlsContainer = (props) => {

    
    // redux
    const dispatch  = useDispatch();
    const playerRef = useSelector(state => state.player.playerRef);

    
    // local state
    const [stampText, setStampText] = useState('');
    

    // helper functions
    const getPlayer      = () => playerRef.current.player.player.player ;
    const getExactTime   = () => getPlayer().getCurrentTime()           ;
    const getRoundedTime = () => Math.floor(getExactTime()) || 0        ;
    
    const shift1Sec = (mode) => {
        const startingTime = getRoundedTime();
        let   endingTime   = (mode==='back' ? startingTime-1 : startingTime+1);
        getPlayer().seekTo(endingTime);
    }
    
    const show1Sec = (mode) => {
        const startingTime = getRoundedTime();
        let   endingTime   = (mode==='repeat' ? startingTime : startingTime+1);
        getPlayer().seekTo(startingTime);
        play();
        setTimeout( () => { pause(); getPlayer().seekTo(endingTime); } , 999 );
    }

    
    // High-level functions to pass to component
    const pause      = () => { getPlayer().pauseVideo();      } ;
    const play       = () => { getPlayer().playVideo();       } ;
    const logTime    = () => { console.log(getRoundedTime())  } ;
    const rewind1Sec = () => { shift1Sec('back')              } ;
    const skip1Sec   = () => { shift1Sec('ahead')             } ;
    const repeat1Sec = () => { show1Sec('repeat')             } ;
    const play1Sec   = () => { show1Sec('play')               } ;
    const test       = () => { console.log(getRoundedTime()); } ;

    const createStampListener = () => {
        dispatch(createStamp([getRoundedTime(), stampText]));
        setStampText('');
    }


    // Spawning the enhanced component and returning it
    const componentProps = {
        pause      ,
        play       ,
        logTime    ,
        rewind1Sec ,
        skip1Sec   ,
        repeat1Sec ,
        play1Sec   ,
        test       ,
        stampText           ,
        setStampText        ,
        createStampListener ,
    };
    
    return <ControlsComponent containerProps={componentProps}/>

}



export default ControlsContainer;