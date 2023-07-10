const aws = require('aws-sdk');
const stream = require('stream');
const express = require('express');
const router = express.Router();
const multer = require('multer')

const AWS_ACCESS_KEY_ID = "AKIA2KHNAPBQJLBXAWWG";
const AWS_SECRET_ACCESS_KEY = "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";
const BUCKET_NAME = "my-bucket";
const BUCKET_REGION = "us-east-1";



const s3 = new aws.S3({
    region: BUCKET_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const uploadStream = key => {
    let streamPass = new stream.PassThrough();
    let params = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: streamPass
    };
    let streamPromise = s3.upload(params, (err, data) => {
        if (err) {
            console.error('ERROR: uploadStream:', err);
        } else {
            console.log('INFO: uploadStream:', data);
        }
    }).promise();
    return {
        streamPass: streamPass,
        streamPromise: streamPromise
    };
};

class CustomStorage {
    _handleFile(req, file, cb) {
        let key = req.query.file_name;
        let { streamPass, streamPromise } = uploadStream(key);
        file.stream.pipe(streamPass)
        streamPromise.then(() => cb(null, {}))
    }
}

const storage = new CustomStorage();
const parse = multer({storage});
app.post("/picture", async (req, res) => {
    try {
      if(!req.files){
        res.send({
          status: false,
          message: "No files"
        })
      } else {
        const {picture} = req.files

router.post('./public/uploads/', parse.single('image'), async (req, res) => {
    try {
        res.status(200).send({ result: 'Success!' });
    } catch (e) {
        console.log(e)
        res.status(500).send({ result: 'Fail!' });
    }
});

}
} catch (e) {
  res.status(500).send(e)
}
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Server is running on port ${port}`))