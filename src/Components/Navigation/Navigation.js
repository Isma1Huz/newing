import  './Navigation.css'
import { Link } from 'react-router-dom';

function Navigation(){
    return (
        <div className="navbar">
            
            <ul>
                <h2>Ticket<span>Ease</span></h2>
                <li className='active'><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
         </div>
    )

}
export default Navigation;