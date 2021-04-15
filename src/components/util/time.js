import { observer } from 'mobx-react-lite'

const Time = observer(({ time, showHours }) => {
	let display = '--:--'
	if (time !== undefined && time >= 0) {
		const seconds = (time % 60).toString().padStart(2,'0')
		if (showHours) {
			const minutes = (Math.floor(time / 60) % 60).toString().padStart(2,'0')
			display = `${Math.floor(time / 3600)}h${minutes}:${seconds}`
		} else {
			const minutes = Math.floor(time / 60).toString().padStart(2,'0')
			display = `${minutes}:${seconds}`
		}
	}
	return <span class="time">{display}</span>
})

export default Time