
// database conncetion with node
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/food-app')


// models/schema

// to store user details in db
const User = mongoose.model('User',{
    username:String,
    email:String,
    password:String,
    cart:[],
    wishlist:[],
    checkout:[],
    address:[]

}) 
const Product = mongoose.model('Product',{
    id:Number,
    title:String,
    price:Number,
    descirption:String,
    category:String,
    image:String,
    rating:{
        rate:Number,
        count:Number,
    }
})

const Wishlist = mongoose.model('Wishlist',{
    id:Number,
    image:String,
    title:String,
    category:String,
    price:Number
})

const Cart=mongoose.model('Cart',{
    id:Number,
    image:String,
    title:String,
    category:String,
    price:Number,
    quantity:Number

})







// export collection
module.exports = {
    User,
    Product,
    Wishlist,
    Cart
}