// import multer from "multer"
// import multerS3 from "multer-s3";
// import s3 from "../config/s3.config.js";
import cloudinary from "../config/cloudinary.config.js"


export const uploadImageCloudinary = async ({file, bucket, filename}) => {
  const res = await cloudinary.uploader.upload(file, {
    folder: bucket,
    filename_override: filename,
  });
  return res;
};
export const deleteImageCloudinary = async (id) => {
  const res = await cloudinary.uploader.destroy(id);
  return res;
};


// https://www.npmjs.com/package/multer-s3
/* 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'some-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

app.post('/upload', upload.array('photos', 3), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})
*/


/* 

export const s3FileUpload = async({bucketName, key, body, contentType}) => {
    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType
    })
    .promise()
}

export const deleteFile = async ({bucketName, key}) => {
    return await s3.deleteObject({
        Bucket: bucketName,
        Key: key
    })
    .promise()
}
*/