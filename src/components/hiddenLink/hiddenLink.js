import { useSelector } from 'react-redux'
//import { selectIsLoggedIn } from '../../redux/slice/authSlice'



export const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    if(isLoggedIn){
        return children
    }
     return null
}


export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    if(!isLoggedIn){
        return children
    }
     return null
}


 