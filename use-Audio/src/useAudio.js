import React, { useState, useEffect } from "react"

export default function useAudio(url=''){
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [audioSrc, setAudioSrc] = useState(url)
    const [audioInstance, setAudioInstance] = useState(null)
    const [endTime, setEndTime] = useState(NaN)
    const [paused, setPaused] = useState(true)
    const [readyState, setReadyState] = useState(0)
    const [ended, setEnded] = useState(null)

    // EFFECTS
    useEffect(() => {
        setAudioInstance(new Audio(url))
    }, [])

    useEffect(() => {
        if(audioInstance){
            

            
        }
        
        return () => {
            
        }
    }, [audioInstance])

    // AUDIO OBJECT METHODS
    const play = () => {
        audioInstance.play()
        setIsPlaying(true)
    }

    const pause = () => {
        audioInstance.pause()
        setIsPlaying(false)
    }

    const addEventListener = (event, listener) => {
        audioInstance.addEventListener(event, listener)
    }

    return{
        set src(newUrl){
            setAudioSrc(newUrl)
        },
        get src(){
            return audioSrc
        },
        readyState,
        playing: isPlaying,
        currentTime,
        duration: endTime,
        play,
        pause,
        paused,
        addEventListener,
        currentSrc: audioSrc,
        ended        
        
    }
}
