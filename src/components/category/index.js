import { observer } from 'mobx-react-lite'
import { ListGroup, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { BsGear, BsFolder, BsBook, BsCardList, BsSearch, BsCollectionPlay, BsFileArrowDown, BsReplyAll, BsStar, BsMic, BsVolumeUp, BsWifi, BsChatDots, BsPeople, BsBookmark, BsFillAlarmFill } from "react-icons/bs"
import { EndpointList } from '/components/endpoint'
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

const ConditionalWrapper = ({
    condition,
    wrapper,
    children,
}) => (condition ? wrapper(children) : children);

const Category = observer(({ api, appState, isMinimized, showEndpoints, showHelp, toggleActiveCategory, fetchEndpoint}) => 
	<ListGroup.Item className={`category-panel ${isMinimized ? 'minimized' : ''} ${appState.active ? 'active' : ''}`}>
		<Card className="category-card">
			<ConditionalWrapper condition={isMinimized} wrapper={children => (
				<OverlayTrigger
					overlay={<Tooltip id={`tooltip-${api.name}`} className="category-tooltip">{api.name}</Tooltip>}
					placement='right'
					>
					{children}
				</OverlayTrigger>
				)}>
				<Card.Header 
					className="category-header"
					onClick={(event) => {
						toggleActiveCategory(api.name)
						document.getElementById('api-panel').scrollTop = 0
					}}>
					{renderIcon(api.name)}
					{!isMinimized && <span class="category-name">{api.name}</span>}
				</Card.Header>
			</ConditionalWrapper>
			{(!isMinimized && showHelp) && (
				<div class="help-text">
					{api.hint}
				</div>
			)}
			{showEndpoints && (
				<EndpointList 	api={api.endpoints}
								appState={appState}
								showHelp={showHelp}
								fetchEndpoint={fetchEndpoint} />
			)}
		</Card>
	</ListGroup.Item>
)

export default Category
export { default as CategoryList } from './list'