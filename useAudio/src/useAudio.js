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
    const [buffered, setBuffered] = useState(0)
    const [listeners, setListeners] = useState([])
    const [autoPlay, setAutoPlay] = useState(false)

    const addUserListeners = (instance) => {
        listeners.forEach(listener => instance.addEventListener(listener.type, listener.callback))
    }

    const removeEventListener = (type, callback) => {
        const filtered = listeners.filter(listener => {
            return (
                listener.type !== type 
                &&
                listener.callback.name !== callback.name
            )
        })
        setListeners(filtered)
    }


    // EFFECTS
    useEffect(() => {
        setAudioInstance(new Audio(url))
    }, [])

    useEffect(() => {
        if(audioInstance){
            addUserListeners(audioInstance)
            audioInstance.addEventListener('readystatechange', () => {
                setReadyState(audioInstance.readyState)
            })
            audioInstance.addEventListener('timeupdate', () => {
                setCurrentTime(audioInstance.currentTime)
            })
            audioInstance.addEventListener('loadedmetadata', () => {
                setEndTime(audioInstance.duration)
            })
            audioInstance.addEventListener('ended', () => {
                setEnded(true)
            })
            audioInstance.addEventListener('progress', () => {
                setBuffered(audioInstance.buffered.lenght)
            })
        }
        
        return () => {
            // CALLBACKS NEED TO BE NAMED TO BE REMOVED!
            if(audioInstance){
                audioInstance.removeEventListener('readystatechange', () => {
                    setReadyState(audioInstance.readyState)
                })
                audioInstance.removeEventListener('timeupdate', () => {
                    setCurrentTime(audioInstance.currentTime)
                })
                audioInstance.removeEventListener('loadedmetadata', () => {
                    setEndTime(audioInstance.duration)
                })
                audioInstance.removeEventListener('ended', () => {
                    setEnded(true)
                })
                audioInstance.removeEventListener('progress', () => {
                    setBuffered(audioInstance.buffered.length)
                })
            }
        }
    }, [audioInstance])

    useEffect(() => {
        if(audioInstance){
            setAudioInstance(new Audio(audioSrc))
        }        
    }, [listeners])

    useEffect(() => {
        setPaused(!isPlaying)
    }, [isPlaying])

    useEffect(() => {
        if(audioInstance){
            audioInstance.pause()
            setAudioInstance(new Audio(audioSrc))
            setCurrentTime(0)
        }
    }, [audioSrc])

    useEffect(() => {
        if(audioInstance){
            audioInstance.autoplay = autoPlay
        }
    }, [autoPlay])



    
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
        ended,
        set autoplay(state){
            setAutoPlay(state)
        },
        get autoplay(){
            return autoPlay
        }        
        
    }
}
