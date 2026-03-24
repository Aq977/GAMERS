import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
// declearig state variables
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")

// statues message
const[loading,setLoading]=useState("")
const[error,setError]=useState("")
const[success,setSuccess]=useState("")


// navigattion
const navigate=useNavigate()

const handleSignin = async(e)=>{
  e.preventDefault()
  setLoading("Please wait.....")
  try{
    // retreving user data
    const formData = new FormData();
    formData.append("email",email)
    formData.append("password",password)

    // adding base url
    const response = await axios.post("https://maxwellhyrax.alwaysdata.net/api/signin", 
      formData);
      if(response.data.user){
        setSuccess(response.data.message)
        setLoading("")
        localStorage.setItem("user", JSON.stringify(response.data.user))
        // navigation on successful signin
        navigate("/")
      }

  } catch(error){
    setError(error)
     
  }

}


  return (
    <div className='row justify-content-center'>
        <div className='col-md-6 card shadow m-2 p-4 '>
            <h1>Signin</h1>

            {/* binding messages */}
            {loading}
            {error}
            {success}
            {/* signin form */}
            <form action="" onSubmit={handleSignin} id='from'>
              <input type='Email' 
              placeholder='Enter Email' 
              className='form-control' 
              onChange={e=>setEmail(e.target.value)}
              required/><br /><br />

              <input type="password" 
              placeholder='Enter Password'
              onChange={e=>setPassword(e.target.value)} 
              className='form-control'/>

              {/* buttom */}
              <input type="submit" value='signin' className='btn btn-danger' /><br /><br />

              {/* incase someone does not have an account */}
              <Link to='/signup' className='text-dark'>Don't have an account? Signup</Link>
            </form>
        </div>
    </div>
  )
}
export default Signin
