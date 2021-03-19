import { observer } from 'mobx-react-lite'
import { ListGroup, Card } from 'react-bootstrap'
import { BsGear, BsFolder, BsBook, BsCardList, BsSearch, BsCollectionPlay, BsFileArrowDown, BsReplyAll, BsStar, BsMic, BsVolumeUp, BsWifi, BsChatDots, BsPeople, BsBookmark, BsFillAlarmFill } from "react-icons/bs"
import Endpoint from '/components/endpoint'
import './index.css'

const renderIcon = (categoryName) => {
	switch(categoryName) {
	  case 'System':			return <BsGear />
	  case 'Browsing':			return <BsFolder />
	  case 'Library':			return <BsBook />
	  case 'AlbumSongLists':	return <BsCardList />
	  case 'Searching':			return <BsSearch />
	  case 'Playlists':			return <BsCollectionPlay />
	  case 'MediaRetrieval':	return <BsFileArrowDown />
	  case 'MediaAnnotation':	return <BsStar />
	  case 'Sharing':			return <BsReplyAll />
	  case 'Podcast':			return <BsMic />
	  case 'Jukebox':			return <BsVolumeUp />
	  case 'InternetRadio':		return <BsWifi />
	  case 'Chat':				return <BsChatDots />
	  case 'UserManagement':	return <BsPeople />
	  case 'Bookmarks':			return <BsBookmark />
	  default:					return <BsFillAlarmFill />
	}
}

const Category = observer(({ api, appState, toggleActiveCategory, fetchEndpoint }) => 
	<ListGroup.Item className={`category-panel${appState.active ? ' active' : ''}`}>
		<Card className="category-card">
			<Card.Header 	className="category-header"
							onClick={(event) => {
								toggleActiveCategory(api.name)
								setTimeout(() => {event.target.scrollIntoView()}, 20);
							}}>
				{renderIcon(api.name)} {api.name}
			</Card.Header>
			<div class="helpText">
				{api.hint}
			</div>
			<ListGroup variant="flush" className="category-endpoints">
				{api.endpoints.map((endpoint, index) => (
					<Endpoint 
						api={endpoint}
						appState={appState.getEndpointByName(endpoint.name)}
						toggleActiveEndpoint={appState.toggleActiveEndpoint}
						fetchEndpoint={fetchEndpoint}
						/>
				))}
			</ListGroup>
		</Card>
	</ListGroup.Item>
)

export default Category