import ProductModel from "..ProductModel.js";

// get all the data

function getAll(req, res, next) {
  try {
    ProductModel.find({}, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ succes: true, response });
    });
  } catch (err) {
    res.status(400).send({ succes: false, err });
  }
}

// get by id
function GetByID(req, res, next) {
  let { id } = req.params;
  ProductModel.findById({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ succes: true, response });
  });
}
//   delete
function Delete(req, res, next) {
  let i = req.params.id;
  ProductModel.findByIdAndDelete({ _id: i }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ succes: true, response });
  });
}

// // create
function Add(req, res, next) {
  let body = req.body;
  let doc = new ProductModel(body);
  doc.save((err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

function Update(req, res, next) {
    let id = req.params.id;
    let body = req.body;
    ProductModel.updateOne({ _id: id }, { $set: body }, (err, response) => {
      if (err) return next(err);
      res.status(200).send({ success: true, response });
    });
  }

const controller = { getAll, GetByID, Add, Delete ,Update};

export default ProductController;
