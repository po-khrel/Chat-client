import axios from "axios";
import { createContext, useState } from "react";



const UserContext = createContext(null)
const server="http://localhost:5000"

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [loading, setLoading] = useState(false)
    const [isAuth, setIsAuth] = useState(
        Boolean(localStorage.getItem('token'))
    )



     const login = async (email, password) => {
        setLoading(true)
        try {
            const response = await axios.post(`${server}/api/users/login`, {
                email,
                password
            })

            const { user, token } = response.data

            setUser(user)
            setIsAuth(true)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)


            return { success: true}
        } catch (error) {
            return { 
                success: false,
                 message: error.response?.data.message || 'Login failed' }
            
        } finally {
            setLoading(false)
        }
    }

      const register = async (username, email, password, profilePicture) => {
        setLoading(true)
        try {
           const formData = new FormData()

           formData.append('username', username)
           formData.append('email', email)
           formData.append('password', password)

           if(profilePicture) {
            formData.append('profilePicture', profilePicture)
           }

           const response = await axios.post(`${server}/api/users/register`,
            formData
           )

           return{
            success: true,
            message: response.data.message,
           }
        } catch (error) {
             return { 
                success: false,
                message: error.response?.data?.message || 'Registration failed'
             }
        } finally {
            setLoading(false)
        }
    }

    const logout  = () => {
        setUser(null)
        setIsAuth(false)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    return(
        <UserContext.Provider value={{ user, loading, isAuth, login, register, logout }}>
            {children}
        </UserContext.Provider>
    )
}