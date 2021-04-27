import { observer } from 'mobx-react-lite'
import { ListGroup, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { GearIcon, FolderIcon, BookIcon, ListIcon, SearchIcon, PlaylistIcon, DownloadIcon, StarIcon, ShareIcon, MicIcon, JukeboxIcon, WifiIcon, ChatIcon, UsersIcon, BookmarksIcon, MuteIcon } from '/icons'
import { EndpointList } from '/components/endpoint'
import './index.css'


const renderIcon = (categoryName) => {
	switch(categoryName) {
	  case 'System':			return <GearIcon />
	  case 'Browsing':			return <FolderIcon />
	  case 'Library':			return <BookIcon />
	  case 'AlbumSongLists':	return <ListIcon />
	  case 'Searching':			return <SearchIcon />
	  case 'Playlists':			return <PlaylistIcon />
	  case 'MediaRetrieval':	return <DownloadIcon />
	  case 'MediaAnnotation':	return <StarIcon />
	  case 'Sharing':			return <ShareIcon />
	  case 'Podcast':			return <MicIcon />
	  case 'Jukebox':			return <JukeboxIcon />
	  case 'InternetRadio':		return <WifiIcon />
	  case 'Chat':				return <ChatIcon />
	  case 'UserManagement':	return <UsersIcon />
	  case 'Bookmarks':			return <BookmarksIcon />
	  default:					return <MuteIcon />
	}
}

const ConditionalWrapper = ({
    condition,
    wrapper,
    children,
}) => (condition ? wrapper(children) : children)

const Category = observer(({ api, appState, isMinimized, showEndpoints, showHelp, toggleActiveCategory, pushBrowserState}) => 
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
					onClick={() => {
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
								pushBrowserState={pushBrowserState} />
			)}
		</Card>
	</ListGroup.Item>
)

export default Category
export { default as CategoryList } from './list'