import React , {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Category , setCategory] = useState('');
    const [Company , setCompany] = useState('');
    const params = useParams()   //hooks
    const navigate = useNavigate() //hooks

    useEffect( ()=> {
console.warn(params);
getProductDetails();
    },[])

  const getProductDetails = async () => {
    console.warn(params)

    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
result = await result.json();
setName(result.Name)
setPrice(result.Price)
setCategory(result.Category)
setCompany(result.Company)
  }

const Updateproduct = async () => {
    console.warn(Name,Price,Category,Company);
    try {
     let response = await fetch(`http://localhost:5000/product/${params.id}`,{
     method: 'PUT',
     body: JSON.stringify({ Name, Price, Category, Company}),
     headers: {
        'Content-Type':'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
     },
    });

if(!response.ok)
{
throw new Error(`Failed to update product: ${response.statusText}`);
}
const result = await response.json();
console.warn(result);
navigate('/');
    }
    catch(error)
    {
    console.error('Error updating product',error.message);
    }
};
return (
<div className='product'>
<h1>Update Product</h1>
<input type="text" placeholder="Enter Product Name" value={Name} onChange={(e)=> setName(e.target.value)} className='inputbox'></input>

<input type="text" placeholder="Enter Product Price" value={Price} onChange={(e)=> setPrice(e.target.value)} className='inputbox'></input>

<input type="text" placeholder="Enter Product Category" value={Category} onChange={(e)=> setCategory(e.target.value)} className='inputbox'></input>

<input type="text" placeholder="Enter Product Company" value={Company} onChange={(e)=> setCompany(e.target.value)} className='inputbox'></input>

<button onClick={Updateproduct} className="clickbutton"> Update Product </button>

</div>
)
}
export default UpdateProduct;
