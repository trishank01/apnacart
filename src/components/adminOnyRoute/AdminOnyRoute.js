import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectIsEmail } from '../../redux/slice/authSlice'


const AdminOnyRoute = ({children}) => {
    const userEmail = useSelector(selectIsEmail)
    if(userEmail === "trishank01@gmail.com"){
        return children
    }
    return (
        <section style={{height : '80vh'}}>
            <div className='container'>
                <h2>Permission Denied</h2>
                <p>This page can only be view by an admin user</p>
                <br/>
                <Link to="/">
                <button  className='--btn '>&larr; Back to Home</button>
                </Link>
            </div>
        </section>
    )
}

export const AdminOnyLink = ({children}) => {
    const userEmail = useSelector(selectIsEmail)
    if(userEmail === "trishank01@gmail.com"){
        return children
    }
    return null
}

export default AdminOnyRoute