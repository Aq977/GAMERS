import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

const Addproduct = () =>{
//declearing state valueables
 const[product_name,setProductName]=useState("")
 const[product_description,setProductDescription]=useState("")
 const[product_cost,setProductCost]=useState("")
 const[product_photo,setProductPhoto]=useState("")


//statues message
 const[loading,setLoading]=useState("")
 const[error,setError]=useState("")
 const[success,setSuccess]=useState("")


//function to add product to database
 const handleSubmit = async(e) =>{
 e.preventDefault()
 setLoading("please wait...")

try{
//retrieving product details
const formData =new FormData();
 formData.append("product_name",product_name)
 formData.append("product_description",product_description)
 formData.append("product_cost",product_cost)
 formData.append("product_photo",product_photo)


//adding base url to post data
 const response =await axios. post("https://maxwellhyrax.alwaysdata.net/api/add_product",formData)
 setSuccess(response.data.success)

}catch(error){
 setError(error.message)
  

}

}
return (
    <div className='row justify-content-center' id='max'>
       <div className='col-md-6 card shadow m-2 p-4 '>
        <h1 className='text-dark' id='form2'>Addproduct</h1>
{/* binding varialbles  */}
{loading}
{error}
{success}

<nav>
  <Link to="/" className='btn btn-cark'>GET ALL PRODUCTS</Link>
</nav>
        {/* addproduct form */}
        <form action="" onSubmit={handleSubmit} id='addproduct'>
          <input type="text"
          placeholder='Product name' 
          className='form-control'
          onChange={(e)=>setProductName(e.target.value)} 
          required/><br />

          <textarea className='form-control'
          placeholder='Enter product description' 
          onChange={(e)=>setProductDescription(e.target.value)}
          required ></textarea><br />

          <input type="number"
          placeholder='product cost'
          className='form-control'
          onChange={(e)=>setProductCost(e.target.value)}
          required/><br />

          <input type="file" 
          placeholder='product photo' 
          className='form-control'
          onChange={(e)=>setProductPhoto(e.target.files[0])} 
          required /><br />


          {/* addproduct button */}

          <input type="submit"
          value="Addproduct" className='btn btn-danger' />
      
         
        </form>

      </div>
    </div>
  )
}




  
export default Addproduct
