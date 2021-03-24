import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'
import Category from '/components/category'
import './index.css'


const CategoryList = observer(({ api, appState, showHelp }) => 
	<ListGroup variant="flush" id="categorys-panel">
		{api.map((category) => (
			<Category
				api={category}
				appState={appState.getCategoryByName(category.name)}
				isMinimized={appState.hasActiveCategory}
				showEndpoints={false}
				showHelp={showHelp}
				toggleActiveCategory={appState.toggleActiveCategory}
				/>
		))}
	</ListGroup>
)


export default CategoryList