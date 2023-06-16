// import db.js
const db=require('./db')





// register
const register = (username,email,password)=>{
    console.log('inside reg logic');
    // check  email in db -findone
    return db.User.findOne({
        email
    }).then((response)=>{
        console.log(response);
        if(response){
            // email already exist
            return{
                statusCode:401,
                message:"Email already exist..."
            }
        }
        else{
            // email is not present in db so register
            const newUser = new db.User({
                username,
                email,
                password,
                cart:[],
                wishlist:[],
                checkout:[],
                address:[]

            })
            // to store newUser in mongodb
            newUser.save()
            // send response as register success
            return{
                statusCode:200,
                message:"Successfully Registered..."
            }
            
        }
    })

}

// login logic
const login=(email,password)=>{
    console.log('inside login dataservice');
    // check emila and pswd in db
   return db.User.findOne({
        email,
        password
    }).then((result)=>{
        if(result){
            // email present in db
            return{
                statusCode:200,
                message:"Login successfull",
                name:result.username,
                email:result.email
            }
        }
        else{
            // email not prsent in db
            return{
                statusCode:404,
                message:"invalid email /pasword"
            }
        }

    })


}
// all-products
const allproducts = ()=>{
    return db.Product.find().then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    products:result
                }


            }
            else{
                return{
                    statusCode:404,
                    message:'no data is present'
                }
            }
           
            
        }
    )
}

// view product
const viewProduct = (id)=>{
    return db.Product.findOne({
        id
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                Product:result,
                items:result.items
            }
        }
        else{
            return{
                statusCode:404,
                message:'product is unavailabe'
            }
        }
        
        
    }
   )
}
const addtowishlist=(product)=>{
    return db.Wishlist.findOne({
        
        id:product.id
    }).then((result)=>{
        if(result){
          return{
            statusCode:401,
            message:'item already in wishlist'
          }

        }
        else{
            let newproduct=db.Wishlist({
                id:product.id,
                image:product.image,
                title:product.title,
                category:product.category,
                price:product.price
            })
            newproduct.save()
            return{
                statusCode:200,
                message:'item added to your wishlist'

            }
        }
    })
}

const getwishlist=()=>{
   return  db.Wishlist.find().then((result)=>{
    if(result){
        return{
            statusCode:200,
            wishlist:result
            
        }
    }else{
        return{
            statusCode:404,
            message:'wishlist is empty'
        }
    }
   })
   }
const detelewishlist=(id)=>{
    return db.Wishlist.deleteOne({
        id
    }).then((result)=>{
        if(result){
            return db.Wishlist.find().then((result)=>{
                if(result){
                    return{
                        statusCode:200,
                        wishlist:result
                    }
                }
                else{
                    return {
                        statusCode:404,
                        message:'wishlist is empty'
                    }
                }
            })
                
            
        }
        else{
            return{
                statusCode:404,
                message:'item not found'
            }
        }
    })
}

// addtocart
const addtocart=(product)=>{
    return db.Cart.findOne({
        id:product.id
    }).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:'item already exist'
            }
        }
        else{
            let newproduct=db.Cart({
                id:product.id,
                image:product.image,
                title:product.title,
                category:product.category,
                price:product.price,
                quantity:1
            })
            newproduct.save()
            return{
                statusCode:200,
                message:'item added to your cart'
            }
        }

    })

}

// getcart
const getcart=()=>{
    return db.Cart.find().then((result)=>{
        if(result){
            return{
                statusCode:200,
                cart:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'cart is empty'
            }
        }
    })
}

// deletecart
const deletecart=(id)=>{
    return db.Cart.deleteOne({
        id
    }).then((result)=>{
        if(result){
            return db.Cart.find().then((result)=>{
                if(result){
                    return{
                        statusCode:200,
                        cart:result
                    }
                }
                else{
                    return {
                        statusCode:404,
                        message:'cart is empty'
                    }
                }
            })
                
            
        }
        else{
            return{
                statusCode:404,
                message:'item not found'
            }
        }
    })
}

// address save
 const deliveryaddress =(email,name,mobile,address)=>{
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            result.address.push({
                name:name,
                email:email,
                mobile:mobile,
                address:address   
            })
            result.save()
            // console.log(result.address);
            return{
                statusCode:200,
                message:'Address Saved'
            }
        }
        else{
            return{
                statusCode:401,
                message:'please login'
            }
        }
    })


 }

//  increment
//   const incrementCount = (id)=>{
//   return db.Cart.findOne({
//     id
//   }).then((result)=>{
//     if(result){
//         result.quantity +=1
//         result.save()
//         return {
//             statusCode:200
//             }
       
//     }
//     else{
//         return{
//             statusCode:404,
//             message:'product is not in your cart '
//         }
//     }
//   })

//   }

//   orders


  const orders = (email,title,image,price,randomid) =>{
    return db.User.findOne({
        email
    }).then((result)=>{
        // console.log(result);
        if(result){
            result.checkout.push({
                id:randomid,
                title:title,
                image:image,
                price:price
            })
            result.save()
            return{
                statusCode:200,
                message:'order added'
            }
        }
        else{
            return{
                statusCode:401,
                message:'please login'
            }
        }
    })
  }
// deleteitems

  const removeAllcart = ()=>{
    return db.Cart.deleteMany()
    .then((result)=>{
        if(result){
            return{
               statusCode:200,
               message:'Item deleted' 
            }
        }
        else{
            return{
                statusCode:401,
                message:'Cart is empty'
            }
        }
    })
  }

  const getOrders = (email)=>{
    return db.User.findOne({
        email
    })
    .then((result)=>{
        console.log(result);
        if(result){
            return{
                statusCode:200,
                orders:result.checkout
            }
        }
        else{
            return{
                statusCode:401,
                message:'Invalid Email'
            }
        }
    })
  }


  const getAddress = (email)=>{
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                address:result.address
            }
        }
        else{
            return{
                statusCode:401,
                message:'Add Address'
            }

        }
    })
  }








// export
module.exports={
    register,
    login,
    allproducts,
    viewProduct,
    addtowishlist,
    getwishlist,
    detelewishlist,
    addtocart,
    getcart,
    deletecart,
    deliveryaddress,
    orders,
    removeAllcart,
    getOrders,
    getAddress,

}