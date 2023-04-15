import ProductModel from "../Models/productModel.js"

// ADD a Product
function addProduct(req, res, next) {
    try {
        let data = req.body
        let ProductData = new ProductModel(data)
        ProductData.save()
        res.status(200).json({ response: ProductData })
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
}

// Get all the data of Product
async function getProduct(req, res, next) {
    try {
        const get = await ProductModel.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Get Product By id
async function getProductByID(req, res, next) {
    let id=req.params.id
    try {
        const getById = await ProductModel.findById({_id:id})
        res.status(200).json({ response: getById })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Delete Product by id
async function deleteProduct(req, res, next) {
    let id = req.params.id
    try {
        const deleteById = await ProductModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Product delete success", response : deleteById})
    } catch (err) {
        res.status(400).json(err)
    }
}

// Update Product By id
async function updateProduct(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        await ProductModel.updateOne({_id:id , $set:data})
        let response = await ProductModel.findById({_id:id})
        res.status(200).json({message : "Update sucss" , response })
    }catch(err){
        res.status(400).json(err)
    }
}
const Product = {addProduct ,getProduct, getProductByID ,deleteProduct ,updateProduct}

export default Product ;
