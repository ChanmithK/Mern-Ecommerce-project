const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Categoty = require('../models/category');


exports.createProduct = (req,res) => { 

    // res.status(200).json({ 
    //     file:req.files, body: req.body
    // });

    const {
        name, price, description, category , quantity , createdBy
    } = req.body;
    let productPictures = [];

    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const product = new Product ({
        name: name,
        slug: slugify(name), 
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product });
        }
    }));


 } ;

 exports.getProductsBySlug = (req,res) => {
     const { slug } = req.params;
     Categoty.findOne({slug:slug})
     .select('_id ')
     .exec((error, category) => {
         if(error){
             return res.status(400).json({error});
         }

         if(category){
             Product.find({ category: category._id })
             .exec((error, products)=> {

                if(error){
                    return res.status(400).json({error});
                }

                if(products.length > 0){
                    res.status(200).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price >5000 && product.price <= 10000),
                            under15k: products.filter(product => product.price >10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price >15000 && product.price <= 20000),
                            upper20k: products.filter(product => product.price >20000)
                        }
                    });
                }
             })
         }
     });
 }

 exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    if (productId) {
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(201).json({ product });
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };
