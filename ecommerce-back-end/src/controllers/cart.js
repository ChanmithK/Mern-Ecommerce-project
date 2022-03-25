const Cart = require('../models/cart');
exports.addItemToCart = (req,res) => {

    //One user can have only one cart. So one cart has different cartItems.
    Cart.findOne({ user: req.user._id })
    .exec((error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
            //if cart already exists then update cart by quantity

            const _product =req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == _product);

            let condition, update;
            if(item){
                condition = { "user": req.user._id, "cartItems.product":_product};
                update = {
                    "$set": {
                        "cartItems.$": { //This .$ is use to update relavnt item relavant quantity
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                };
            }else{
                condition = { user: req.user._id};
                update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }; 
            }
            Cart.findOneAndUpdate(condition,update)
            .exec((error, _cart) => {
                if(error) return res.status(400).json({ error });
                if(_cart){
                    return res.status(201).json({ cart: _cart });  
                }
            })

        }else{
            //if cart not exists then create a new cart
            const cart = new Cart({
                user:req.user._id,
                cartItems: [req.body.cartItems]
            });
        
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart){
                    res.status(201).json({ cart });
                }
            });
        }
    }); 
};