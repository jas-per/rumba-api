import { observer } from 'mobx-react-lite'
import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap'
import { PlaylistIcon } from '/icons'

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
	<a 	href="" ref={ref}
		onClick={(e) => {
			e.preventDefault()
			onClick(e)
		}} >
	  {children}
	</a>
  ));

const PlaylistMenu = observer(({ playlistID, disabled, getSongIDs, onClear }) => (
	<Dropdown drop='left' id="pls-actions">
		<Dropdown.Toggle as={CustomToggle}>
			<PlaylistIcon />
		</Dropdown.Toggle>
		<Dropdown.Menu>
			<Dropdown.Header>
				Playlist
			</Dropdown.Header>
			<Dropdown.Item eventKey="1" onSelect={onClear} disabled={disabled}>
				clear
			</Dropdown.Item>
			<Dropdown.Item eventKey="2" onSelect={()=>{}} disabled={disabled}>
				save
			</Dropdown.Item>
			{playlistID &&
				<Dropdown.Item eventKey="3" onSelect={getSongIDs} disabled={disabled}>
					update
				</Dropdown.Item>
			}
		</Dropdown.Menu>
	</Dropdown>
))

export default PlaylistMenu