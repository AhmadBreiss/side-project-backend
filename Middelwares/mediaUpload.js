import multer from "multer";

const path = "upload";

const storage = multer.diskStorage({
  destination: (req, image, cb) => {
    cb(null, path);
  },
  filename: (req, image, cb) => {
    cb(
      null,
      `${Date.now()}-${
        image.fieldname + "." + image.originalname.split(".").pop()
      }`
    );
  },
});

export const upload = multer({ storage }).single("image");
