import { useEffect,useState } from 'react'; 
import image from '../logo.svg'
import axios from'axios';
import {useNavigate} from 'react-router-dom';
import Mycarousel from './Mycarousel';


const Getproduct= () =>{

 //declaring state variables
   const [product,setProduct]=useState([]);
   const [loading,setLoading] =useState("");
   const [error, setError] =useState("");

//setting img url
 const img_url="https://maxwellhyrax.alwaysdata.net/static/images/"

//navigation
  const navigate=useNavigate()


//function to call product
 const getProduct=async() =>{
    setLoading("please wait....")



 try{ 
    const response=await axios.get("https://maxwellhyrax.alwaysdata.net/api/get_product_details")
    setProduct(response.data)
    setLoading("")
   }catch (error){
   setError(error.message)
}
}



//use effect to retrieve product product outomatically
 

   useEffect(()=>{
    getProduct()
    },[]);
    

   return (
    <div className='row'>
      <h3>Available products</h3>
      <Mycarousel/>
      {/* biding valuables */}
      {loading}
      {error}

      {/* designing products card */}

      {product.map((product)=>(

      
      <div className='col-md-3 justify-contnent-center mb-4'key= {product.product_id}>
        
        <div className='card shadow card-margin'>
          <img className='mt-2 product_img' src={img_url + product.product_photo} alt={product.product_photo} />




          {/* the product details */}
          <div className='card-body getproduct'>
            <h5 className='mt-2'>{product.product_name}</h5>
            <p className='text-muted'>{product.product_description}</p>
            <b className='text-warning'>ksh. {product.product_cost}</b><br /><br />
            <button className='btn btn-dark mt-2 w-100' onClick={()=> navigate("/makepayment",{state:{product}})}>Purchase now</button>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Getproduct
