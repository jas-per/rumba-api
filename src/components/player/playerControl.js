import { observer } from 'mobx-react-lite'
import { PlayIcon, PauseIcon, StopIcon, PrevIcon, NextIcon } from '/icons'

const PlayerControl = observer(({ isPlaying, setPlaying, onStop, hasSource, hasPrev, setPrev, hasNext, setNext }) => (
	<div class="player-middle">
		<PrevIcon class={`icon ${hasPrev ? '' : 'disabled'}`} onClick={setPrev} />
		<StopIcon class={`main-icon ${hasSource ? '' : 'disabled'}`} onClick={onStop} />
		{isPlaying ? (
			<PauseIcon class={`main-icon ${hasSource ? '' : 'disabled'}`} onClick={() => setPlaying(false)} />
		) : (
			<PlayIcon class={`main-icon ${hasSource ? '' : 'disabled'}`} onClick={() => setPlaying(true)} />
		)}
		<NextIcon class={`icon ${hasNext ? '' : 'disabled'}`} onClick={setNext} />
	</div>
))

export default PlayerControl