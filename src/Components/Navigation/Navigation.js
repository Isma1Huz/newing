import  './Navigation.css'

function Navigation(){
    return (
        <>
        <div className="navbar">
            <h2>Air<span>Line</span></h2>
            <ul>
                <li className='active'>Home</li>
                <li>About</li>
                <li>Contacts</li>
            </ul>
         </div>
        </>
    )

}
export default Navigation;