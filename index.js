// automatically load env file to oue app
require('dotenv').config()

// import express
const express=require('express')
// import dataservice
const dataservice=require('./services/dataService')
// import cors
const cors=require('cors')
// create server app
const server=express()
const PORT = 3000
// use in server app
server.use(cors())
server.use(express.json())
// route-localhost:3000
server.get('/',(req,res)=>{
    res.send("E cart server started")
})
// run app
server.listen(PORT,()=>{
    console.log(`E cart server started at port ${PORT}`);
})



// register api call
server.post('/register',(req,res)=>{
    console.log('inside register api');
    console.log(req.body);


    // call register fn of dataservice
    // async
    dataservice.register(req.body.username,req.body.email,req.body.password)
    .then((result)=>{
            // response send to client
    res.status(result.statusCode).json(result)

    })
    // res.send('register request resolved')
})

// login
server.post('/login',(req,res)=>{
    console.log('inside login api');
    console.log(req.body);
    // call login logic
    dataservice.login(req.body.email,req.body.password)
    .then((result)=>{
        // response send to client
res.status(result.statusCode).json(result)

})

})

// allproducts
server.get('/all-products',(req,res)=>{
    dataservice.allproducts().then((result)=>{

        res.status(result.statusCode).json(result)

    })
})

// viewproduct
server.get('/view-product/:productId',(req,res)=>{
    dataservice.viewProduct(req.params.productId).then((result)=>{
        res.status(result.statusCode).json(result)


    })
})

// add to wishlist
server.post('/add-to-wishlist',(req,res)=>{
    dataservice.addtowishlist(req.body).then((result)=>{

        res.status(result.statusCode).json(result)

    })

})

// getwishlist
server.get('/get-wishlist',(req,res)=>{
    dataservice.getwishlist().then((result)=>{

        res.status(result.statusCode).json(result)

    })

})

// deletewishlist
server.delete('/delete-wishlist/:productId',(req,res)=>{
    dataservice.detelewishlist(req.params.productId).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})

// addtocart
server.post('/add-to-cart',(req,res)=>{
    dataservice.addtocart(req.body).then((result)=>{

        res.status(result.statusCode).json(result)


    })
})
// getcart
server.get('/get-cart',(req,res)=>{
    dataservice.getcart().then((result)=>{
        res.status(result.statusCode).json(result)
})
})
// deletecart
server.delete('/delete-cart/:productId',(req,res)=>{
    dataservice.deletecart(req.params.productId).then((result)=>{
        res.status(result.statusCode).json(result)

    })

})

// address
server.post('/save-address',(req,res)=>{
    dataservice.deliveryaddress(req.body.name,req.body.email,req.body.mobile,req.body.address).then((result)=>{
        res.status(result.statusCode).json(result)
})
})
// increment

// server.get('/increment-count/:id',(req,res)=>{
//     dataservice.incrementCount(req.params.id).then((result)=>{
//         res.status(result.statusCode).json(result)
// })
// })

server.post('/orders',(req,res)=>{
    dataservice.orders(req.body.email,req.body.title,req.body.image,req.body.price,req.body.randomid)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
// delete items
server.delete('/delete-all-cart',(req,res)=>{
    dataservice.removeAllcart()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.post('/get-orders',(req,res)=>{
    dataservice.getOrders(req.body.email)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})


server.post('/get-address',(req,res)=>{
    dataservice.getAddress(req.body.email)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})



