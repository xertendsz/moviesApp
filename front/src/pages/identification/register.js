import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Register({goLogin}) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState(null)
    const nav = useNavigate()
    const { userId } = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value})
    }

const handleRegister = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:3000/users/register', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 200) {
            localStorage.setItem("username", formData.username)
            localStorage.setItem("userId", response.data.userId)
            nav(`/${userId}`)
        }
    } catch (error) {
        if (error.response && error.response.data) {
            setErrors({general: error.response.data.error});
          } else {
            setErrors({ general: 'An error occurred' });
          }
          console.error('ERROR: ', error);
        }
    }

  return (
    <div className="register-card card text-center">
        <h2 className='create-account'>Create an Account</h2>
        <form className="register-form" action="/register" method='POST'>
            <div className="username register-form-item">
                <label className='register-label' htmlFor="username">Username</label>
                <input className='register-input' placeholder='Username' name='username' value={formData.username} onChange={handleChange} type="text" />
                {errors && errors.general && errors.general.includes("Username") && <p className='register-error'>{errors.general}</p>}
            </div>
            <div className="email register-form-item">
                <label className='register-label' htmlFor="email">Email Address</label>
                <input className='register-input' placeholder='Email Address' name='email' value={formData.email} onChange={handleChange} type="text" />
                {errors && errors.general && errors.general.includes("Email") && <p className='register-error'>{errors.general}</p>}
            </div>
            <div className="pass register-form-item">
                <label className='register-label' htmlFor="password">Password</label>
                <input className='register-input' placeholder='Password' name='password' value={formData.password} onChange={handleChange} type="password" />
                {errors && errors.general && errors.general.includes("Password Field") && <p className='register-error'>{errors.general}</p>}
            </div>
            <div className="confirm register-form-item">
                <label className='register-label' htmlFor="confirm-password">Confirm Password</label>
                <input className='register-input' placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} type="password" />
                {errors && errors.general && errors.general.includes("Passwords") && <p className='register-error'>{errors.general}</p>}
            </div>
            <button onClick={(e) => handleRegister(e)} className="register-button">Register</button>
        </form>
        <div className="card-footer card-footer-register">
            <div className="login-back">Have an account? <span className='like-link' onClick={goLogin}>Login</span></div>
        </div>
    </div>
  )
}

export default Register