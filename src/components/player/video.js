import { useState, useEffect, useRef } from 'react'

const useVideo = url => {
	const video = useRef()
	const [errorMsg, setErrorMsg] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isPlaying, setPlaying] = useState(false)
	const [muted, setMuted] = useState(false)
	const [volume, updateVolume] = useState(100)
	const [curDuration, setDuration] = useState(0)
	const [audioOnly, setAudioOnly] = useState(true)
	const [curPlaytime, updatePlaytime] = useState(0)

	const togglePlaying = () => setPlaying(!isPlaying)
	const toggleMuted = () => setMuted(!muted)

	useEffect(() => {
			if (isPlaying) {
				video.current.play().catch(()=>setPlaying(false))
			} else {
				video.current.pause()
			}
		},
		[isPlaying]
	)
	useEffect(() => {
			setPlaying(false)
			setLoading(true)
			video.current.src = url
		},
		[url]
	)
	useEffect(() => {
			video.current.muted = muted
		},
		[muted]
	)
	// one-time add -> removes event listeners on teardown
	useEffect(() => {
		let videoElem = video.current
		let listeners = {}
		listeners.ended = function() {
			updatePlaytime(0)
			setPlaying(false)
		}
		listeners.loadeddata = function() {
			setDuration(Math.round(videoElem.duration))
			setAudioOnly(!videoElem.videoHeight > 0)
			setErrorMsg('')
			setLoading(false)
			setPlaying(true) // triggers browser-ui, if autoplay is not confirmed for site
		}
		listeners.timeupdate = function() {
			updatePlaytime(Math.round(videoElem.currentTime))
		}
		listeners.volumechange = function() {
			updateVolume(Math.round(videoElem.volume * 100))
		}
		listeners.error = function() {
			setLoading(false)
			setErrorMsg(videoElem.error.message)
		}
		for (const event of Object.keys(listeners)) {
			videoElem.addEventListener(event, listeners[event])
		}
		return () => {
			for (const event of Object.keys(listeners)) {
				videoElem.removeEventListener(event, listeners[event])
			}
		}
	}, [])
	// return video node and props object
	return [
		<video ref={video} />,
		{
			curPlaytime,
			curDuration,
			isPlaying,
			setPlaying,
			togglePlaying,
			changePlaytime: newPlaytime => {
				video.current.currentTime = newPlaytime
			},
			volume,
			changeVolume: newVolume => {
				video.current.volume = newVolume / 100
			},
			muted,
			toggleMuted,
			audioOnly,
			isLoading,
			errorMsg
		}
	]
}

export default useVideo;