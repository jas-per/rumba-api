import { observer } from 'mobx-react-lite'
import { PlayIcon, PauseIcon, StopIcon, PrevIcon, NextIcon } from '/icons'

const PlayerControl = observer(({ isPlaying, setPlaying, onStop, hasPrev, setPrev, hasNext, setNext }) => (
	<div class="player-middle">
		<PrevIcon class={`icon ${hasPrev ? '' : 'disabled'}`} onClick={setPrev} />
		<StopIcon class="main-icon" onClick={onStop} />
		{isPlaying ? (
			<PauseIcon class="main-icon" onClick={() => setPlaying(false)} />
		) : (
			<PlayIcon class="main-icon" onClick={() => setPlaying(true)} />
		)}
		<NextIcon class={`icon ${hasNext ? '' : 'disabled'}`} onClick={setNext} />
	</div>
))

export default PlayerControl