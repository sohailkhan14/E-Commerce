import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
 const [Product, setProduct] = useState([]);

 useEffect( ()=> {
getProducts();
 },[])


const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products', {
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
result = await result.json();
setProduct(result);
}

const deleteproduct = async (id) => {
    try {
    let result = fetch(`http://localhost:5000/product/${id}`,{
        method:"Delete",
        headers: {
   authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`    
            }    
    });
if(result.ok) {
result = await result.json()
getProducts(); 
} else {
console.error('Failed to delete product:', result.status);
} 
}catch(error) {
console.error('Error deleting product:', error);
}

};


const searchHandle = async (event) => {
const key = event.target.value;
if(key)
{
    let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers: {
   authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`    
            }    
    });
   result = await result.json()
if(result) {
setProduct(result); }
}
else {
    getProducts();}
}
return (
<div className="product-list">
<h3>ProductList</h3>
<input type="text" className="search-box" onChange={searchHandle} placeholder="Search Product"></input>
<ul>
<li>S.No.</li>
<li>Name</li>
<li>Price</li>
<li>Category</li>
<li>Company</li>
<li>Operation</li>
</ul>

{
Product.length>0 ? Product.map( (item,index)=> 
<ul key={item._id}>
<li>{index+1}</li>
<li>{item.Name}</li>
<li>{item.Price}</li>
<li>{item.Category}</li>
<li>{item.Company}</li>
<li><button onClick = { () => deleteproduct(item._id)} > Delete </button>
<Link to = {'/update/'+ item._id}> Update </Link>          {/* yahan mistake thi because mene link small mein likha tha but phir Link kar diya */}
</li>
</ul>
) : <h1>No Result Found</h1>
}
</div>
)
}
export default ProductList;
