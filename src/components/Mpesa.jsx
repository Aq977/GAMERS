import React,{useState} from 'react'

import image from'../logo.svg'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
const Mpesa = () => {
  // declearing states variables
  const {product} =useLocation().state ||{};
  const [phone,setPhone]= useState("")
  const [message,setMessage]= useState("")
  const [error,setError]= useState("")

  // image url
  const img_url="https://maxwellhyrax.alwaysdata.net/static/images/"


  const handleSubmit=async (e)=>{
    e.preventDefault()

    setMessage("please wait as we process the transaction")
    // retrieving user and products details
    try{
      const formData=new FormData()
      formData.append ("phone",phone)
      formData.append ("amount",product.product_cost)


      // adding the base url
      const response = await axios.post("https://maxwellhyrax.alwaysdata.net/api/mpesa_payment"
        ,formData)
        console.log(response.data)

    }catch(error){
      setError(error.message)

    }

  }


 
  return (
    <div className='row justify-content-center p-2 '>
      <h1>LIPA NA MPESA</h1>
      <div className='col-md-6 card shadow '>
      <img src={img_url + product.product_photo} alt={product.product_photo} />
        <p>product Name : {product.product_name}</p>
        <p className='text-warning'>product Cost :ksh. {product.product_cost}</p>

    {/* bind variables */}
    {phone}
    {message}
    {error}
    {/* phone input */}
    <form action=" "onSubmit={handleSubmit}>
    
      <input type="tel" 
      placeholder='Enter phone number'
      className='form_control' onChange={(e)=> setPhone(e.target.value)}/><br/><br />
  

      <button className='btn btn-dark'>
        Make payment
      </button>
    </form>
        </div>
    </div>
  )
}

export default Mpesa
