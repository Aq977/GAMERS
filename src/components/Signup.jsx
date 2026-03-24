import axios from 'axios'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const Signup =() =>{
    // declearing states variables
  const[username,setUsername]= useState("")
  const[email,setEmail]= useState("")
  const[phonenumber,setPhonenumber]= useState("")
  const[password,setPassword]= useState("")

  //statues messsage
const  [loading, setLoading]=useState("")
const [error,setError]=useState("") 
const [success,setSuccess]=useState("")

// FUNCTION TO SUBMIT
const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading("please waiting..")
     try{
        // retriving user details
    const formData=new FormData();
    formData.append("username",username)
    formData.append("phonenumber",phonenumber)
    formData.append("password",password)

    // adding base url
    const response=await axios.post("http://maxwellhyrax.alwaysdata.net/api/signup",formData)

    setSuccess(response.data.success)

  }catch(error){
    setError(error)
     }
}




  return (
    <div id='dark'>
    <div className="row justify-content-center">
         <div className="col-md-6 card shadow m-2 p-4">
            <div>
                <h1 className=''>Signup</h1>
                {/* binding values from from */}
        {username}<br/>
        {email}<br/>
        {phonenumber}<br/>
        {password}<br/>
          <form className='form-container'>
              <fieldset>
                <input type="text" 
                  placeholder='Enter username'
                  onChange={(e)=>setUsername(e.target.value)}
                  className='form-control'/><br/>

                <input type="email"
                  placeholder='Enter Email'
                  onChange={(e)=>setEmail(e.target.value)}
                  className='Form-control' /><br/><br />

                <input type="tel" 
                  placeholder='Enter Phone Number'
                  onChange={(e)=>setPhonenumber(e.target.value)}
                  className='form-control' /><br/>

                <input type="password" 
                  placeholder='Enter Password'
                  onChange={(e)=>setPassword(e.target.value)} 
                  className='form control' /><br/><br />

                <input type="submit" value="Signup" className='btn btn-danger' /><br /><br />
                  </fieldset>
                    {/* incase someone has an acccount */}
                  <Link to="/signin" className='btn btn-danger badge'>Already have an account? Signin</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
