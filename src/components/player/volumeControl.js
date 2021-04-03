import { observer } from 'mobx-react-lite'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Slider from 'rc-slider';
import { MuteIcon, VolumeIcon } from '/icons'
import './slider.css'


const VolumeControl = observer(({ volume, setVolume, isMuted, onMute }) => {
	
	return (
		<div id="controls-volume">
			<div class="volume-icon">
				{isMuted ? <MuteIcon onClick={onMute} /> : <VolumeIcon onClick={onMute} />}
			</div>
			<OverlayTrigger
				overlay={<Tooltip id="volume-tooltip">{`${volume} %`}</Tooltip>} 
				delay={{ hide: 500 }}
				popperConfig={{ modifiers: [{ name: 'offset', options: {offset: [0, 5]} }] }}
				placement='left'
				>
				<div className="volume-slider">
					<Slider
						vertical={true}
						min={0}
						max={100}
						step={1}
						value={isMuted ? 0 : volume}
						onChange={setVolume}
					/>
				</div>
			</OverlayTrigger>
		</div>
		)
})

export default VolumeControl