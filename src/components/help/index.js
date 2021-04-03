import { observer } from 'mobx-react-lite'
import { DoubleLeftIcon, DoubleRightIcon } from '/icons'
import './index.css'


const Help = observer(({ toggle, showing }) => (

    <div id="help-button" onClick={toggle}>
        {showing ? <DoubleLeftIcon /> : <DoubleRightIcon />}
        <span>help</span>
    </div>

))

export default Help