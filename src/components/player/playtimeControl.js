import { observer } from 'mobx-react-lite'
import Slider from 'rc-slider'
import './slider.css'
import Time from '/components/util/time'

const PlaytimeControl = observer(({ curPlaytime, curTotaltime, onChange }) => (
	<div className="playtime">
		<Time time={curPlaytime} />
		<Slider
			className="playtime-slider"
			min={0}
			max={curTotaltime}
			step={1}
			value={curPlaytime}
			onChange={onChange}
			disabled={curTotaltime <= 0}
		/>
		<Time time={curTotaltime} />
	</div>
))

export default PlaytimeControl