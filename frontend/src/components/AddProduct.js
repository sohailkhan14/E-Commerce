import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Category , setCategory] = useState('');
    const [Company , setCompany] = useState('');
    const [error , setError] = useState(false);
    const navigate = useNavigate();

    const addproduct = async () => {
    if(!Name || !Price || !Category || !Company) {
    setError(true);
    return;
    }
 
    const UserId = JSON.parse(localStorage.getItem('user'))._id;   // change in userId in place of small u i use  capital U
    let result = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        body: JSON.stringify({ Name, Price, Category, Company, UserId}), // change in userId in place of small u i use  capital U
        headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });

    result = await result.json();
    console.warn(result);
    navigate('/');
    }

return (
<div className='product'>
<h1>Add Product</h1>
<input type="text" className='inputbox' value={Name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Product Name'/>
{error  && !Name && <span className='invalid-input'>Enter valid name</span>}

<input type='text' className='inputbox' value={Price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter Product Price'/>
{error  && !Price && <span className='invalid-input'>Enter valid price</span>}

<input type='text' className='inputbox' value={Category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Product Category'/>
{error  && !Category && <span className='invalid-input'>Enter valid category</span>}

<input type='text' className='inputbox' value={Company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter Product Company'/>
{error  && !Company && <span className='invalid-input'>Enter valid company</span>}

<button onClick={addproduct} className="clickbutton">Add Product</button>
</div>
);
}
export default AddProduct;