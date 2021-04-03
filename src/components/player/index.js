import { observer } from 'mobx-react-lite'
import useVideo from './video.js'
import PlayerControl from './playerControl'
import ModeControl from './modeControl'
import PlaylistMenu from './playlistMenu'
import PlaytimeControl from './playtimeControl'
import VolumeControl from './volumeControl'
import { PauseIcon, PlayIcon } from '/icons'
import './index.css'


const Player = observer(({ url }) => {
	const [videoElement, video]  = useVideo(url);

	return (
		<div id="play-pane">
			<div className="player-header">
				<div id="controls-main">
					<div className="player-icons">
						<ModeControl  	jukeboxMode={false}
										jukeboxToggle={()=>{}}
										repeatActive={false}
										repeatToggle={()=>{}}
										shuffleActive={false}
										shuffleToggle={()=>{}}
										/>
						<PlayerControl  isPlaying={video.isPlaying}
										setPlaying={video.setPlaying}
										onStop={() => {
											video.setPlaying(false)
											video.changePlaytime(0)
										}}
										hasPrev={false}
										setPrev={()=>{}}
										hasNext={false}
										setNext={()=>{}}
										/>
						<div className="player-right">
							<PlaylistMenu 	playlistID={null}
											disabled={true}
											getSongIDs={() => {}}
											onClear={() => {}}
											/>
						</div>
					</div>
					<PlaytimeControl  	curPlaytime={video.curPlaytime}
										curTotaltime={video.curDuration}
										onChange={video.changePlaytime}
										/>
				</div>
				<VolumeControl  volume={video.volume}
								setVolume={video.changeVolume}
								isMuted={video.muted}
								onMute={video.toggleMuted}
								/>
			</div>
			<div id="video-player-pane"
				class={video.audioOnly ? '' : 'with-video-pane'}
				onClick={video.togglePlaying}>
				{videoElement}
				{!video.audioOnly && (
					<span class="big-button-overlay">
						{video.isPlaying ? <PauseIcon /> : <PlayIcon />}
					</span>
				)}
			</div>
			<div class="player-footer" />
		</div>
	)
})

export default Player;