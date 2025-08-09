const express = require('express');
const cors = require('cors');
require('./db/Config');
const User = require('./db/User');
const Product = require("./db/Product")
const Jwt = require("jsonwebtoken");

const jwtKey = 'e-dash';

const app = express();

app.use(cors());


app.use(express.json());

// app.post("/register", (req,res) => {
//     let User = new User(req.body);
//     User.save()
//     .then(result => {
//         result = result.toObject();
//         delete result.password
//         Jwt.sign({result} , jwtKey , {expiresIn: "2h"}, (err, token) => {
//             if(err) {
//                 resp.send({result: 'Something went wrong , please try after sometimes'})
//             }
//             resp.send({result, auth:token})

//         })
//     })
//     .catch(error => {
//         resp.status(500).send({error:error.message}); //Handle error gracefully
//     });
// })


// app.post("/register", (req, res) => {
//     console.log("Frontend sent:", req.body);  // 

//     let user = new User(req.body);    // User

//     user.save()     //User
//     .then(result => {
//         console.log("Saved user:", result);  //
//         result = result.toObject();
//         delete result.Password;

//         Jwt.sign({ result } , jwtKey,  { expiresIn: "2h"} , (err , token) => {
//             if(err) {
//                 return res.send( { result: "Something went wrong"});
//             }
//             res.send({ result, auth: token});
//         });
//     })
//     .catch(err => {
//         console.error(" Save failed:", err); //
//         res.status(500).send({error: err.message});
//     });
// });




app.post("/register", (req, res) => {
  console.log("Frontend sent:", req.body); // ✅

  let user = new User(req.body);

  user.save()
    .then(result => {
      console.log("Saved user:", result); // ✅
      result = result.toObject();
      delete result.Password; 

      Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          return res.send({ result: "Something went wrong" });
        }
        res.send({ result, auth: token });
      });
    })

    .catch(err => {
      console.error("Save failed:", err); // ✅
      res.status(500).send({ error: err.message });
    });
});





app.post("/login", async (req, resp) => {
    console.log(req.body)
    if(req.body.Password && req.body.Email) {
        let user = await User.findOne(req.body).select("-password");
        if(user) {
            Jwt.sign({ user} , jwtKey , { expiresIn: "2h"} , (err,token) => {
                if(err) {
                resp.send( { result: 'Something went wrong, please try after  sometime'})
            }
             resp.send( { user, auth: token})
             
            })
        }
        else {
            resp.send({result: 'No User Found'})
        }

    }
    // else {
    //     resp.send({result:'No user Found'})
    // }
})


app.post("/add-product", verifyToken, async (req , resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
});

app.get('/products', verifyToken , async (req, resp) => {
    let products = await Product.find();
    if(products.length>0) {
        resp.send(products)
    }
    
    else {
        resp.send( { result: " No prouduct found"})
    }
})

//app.delete("product/:id",verifyToken, async (req, resp) => {
//   const result = await Product.deleteOne({_id: req.params.id})
//    resp.send(result);
//});


app.delete("/product/:id", verifyToken, async ( req, res) => {
    try {
        const result = await Product.deleteOne({_id: req.params.id});
        res.send({success: true, result});
    } catch(err) {
        res.status(500).send({message: "Delete failed", error: err.message});
    }
});




app.get("/product/:id", verifyToken, async( req, resp) => {
    const result = await Product.findOne({_id: req.params.id})
    if(result) {
        resp.send(result)
    }else {
        resp.send({result: "no result Found"})

    }
})

app.put("/product/:id", verifyToken, async (req,resp) => {
    let result = await Product.updateOne(
        {_id: req.params.id} ,
        {
           $set: req.body
        }
    )
    resp.send(result)
});


app.get('/search/:key', verifyToken , async (req, resp ) => {   
    let result = await Product.find( {
        "$or": [
            { Name: {$regex: req.params.key, $options: "i"} },
            { Price: {$regex: req.params.key, $options: "i"} },
            { Category: {$regex: req.params.key, $options: "i"} },
            { Company: {$regex: req.params.key, $options: "i"} },
 
        ]
    });
    resp.send(result)
})



function verifyToken( req, resp, next) {
    let token = req.headers['authorization'];
    if(token) {
        token = token.split(' ')[1];
        console.warn("middleware , called", token)
        Jwt.verify(token, jwtKey, (err, valid) => {
            if(err) {
                resp.status(401).send({result:"Please provide valid token"})
            }else {
                next();
            }
        })
    }

else {
    resp.status(403).send({result: "Please add token with header"})
}
//next();
}

app.listen(5000, ()=> {
    console.log("Server is running on port 5000");
});




