import categoryModel from "../Models/categoryModel.js"

// ADD a Category
function addCategory(req, res, next) {
    try {
        let data = req.body
        let CategoryData = new categoryModel(data)
        CategoryData.save()
        res.status(200).json({ response: CategoryData })
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
}

// Get all the data of Category
async function getCategory(req, res, next) {
    try {
        const get = await categoryModel.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Get Category By id
async function getCategoryByID(req, res, next) {
    let id=req.params.id
    try {
        const getById = await categoryModel.findById({_id:id})
        res.status(200).json({ response: getById })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Delete Category by id
async function deleteCategory(req, res, next) {
    let id = req.params.id
    try {
        const deleteById = await categoryModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Category delete success", response : deleteById})
    } catch (err) {
        res.status(400).json(err)
    }
}

// Update Category By id
async function updateCategory(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        await categoryModel.updateOne({_id:id , $set:data})
        let response = await categoryModel.findById({_id:id})
        res.status(200).json({message : "Update sucss" , response })
    }catch(err){
        res.status(400).json(err)
    }
}
const Category = {addCategory ,getCategory, getCategoryByID ,deleteCategory ,updateCategory}

export default Category ;
