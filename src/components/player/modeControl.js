import { observer } from 'mobx-react-lite'
import { JukeboxFillIcon, RepeatIcon, ShuffleIcon } from '/icons'

const ModeControl = observer(({ jukeboxMode, jukeboxToggle, repeatActive, repeatToggle, shuffleActive, shuffleToggle }) => (
	<div className="player-left">
		<JukeboxFillIcon class={`icon ${jukeboxMode ? '' : 'disabled'}`} onClick={jukeboxToggle} />
		<RepeatIcon class={`icon ${repeatActive ? '' : 'disabled'}`} onClick={repeatToggle} />
		<ShuffleIcon class={`icon ${shuffleActive ? '' : 'disabled'}`} onClick={shuffleToggle} />
	</div>
))

export default ModeControl