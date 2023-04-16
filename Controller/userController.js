import userModel from "../Models/userModel.js";

// ADD a User
function addUser(req, res, next) {
    try {
        let data = req.body
        let UserData = new userModel(data)
        UserData.save()
        res.status(200).json({ response: UserData })
    } catch (err) {
        console.log(err);
        res.status(500).json({ err })
    }
}

// Get all the data of User
async function getUser(req, res, next) {
    try {
        const get = await userModel.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Get User By id
async function getUserByID(req, res, next) {
    let id=req.params.id
    try {
        const getById = await userModel.findById({_id:id})
        res.status(200).json({ response: getById })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Delete User by id
async function deleteUser(req, res, next) {
    let id = req.params.id
    try {
        const deleteById = await userModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "User delete success", response : deleteById})
    } catch (err) {
        res.status(400).json(err)
    }
}

// Update User By id
async function updateUser(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        let response = await userModel.findByIdAndUpdate({_id:id}, data, { new: true })
        res.status(200).json({ message: "Update success", response })
    } catch(err){
        res.status(400).json(err)
    }
}

const User = {addUser ,getUser, getUserByID ,deleteUser ,updateUser}

export default User ;
