import { NavLink } from 'react-router-dom'

export function AppHeader(){
    return(
        <header className='app-header'>
            <nav className='main-nav'>
             <ul className="flex auto-center clean-list column-gap">
                 <li><NavLink className="main-link" exact to='/'>Home</NavLink></li>
                 <li><NavLink className="main-link" to='/currency'>Currency Convertor</NavLink></li>
                 <li><NavLink className="main-link" to='/rates'>Currency Rates</NavLink></li>   
             </ul>
            </nav>
        </header>
    )
}