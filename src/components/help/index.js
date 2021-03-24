import { observer } from 'mobx-react-lite'
import { BsChevronDoubleLeft,BsChevronDoubleRight } from 'react-icons/bs'
import './index.css';


const Help = observer(({ toggle, showing }) => (

    <div id="help-button" onClick={toggle}>
        {showing ? <BsChevronDoubleLeft/> : <BsChevronDoubleRight/>}
        <span>help</span>
    </div>

))

export default Help;