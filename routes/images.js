import mongoose from "mongoose";
import express from "express";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();


router.get("/:filename", (req, res, next) => {
    const connect = mongoose.createConnection(
        process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true });
    
    connect.once('open', () => {
            // initialize stream
            const gfs = new mongoose.mongo.GridFSBucket(connect.db, {
                bucketName: "uploads"
            });
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (!files[0] || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available',
                    });
                }
        
                if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
                    // render image to browser
                    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
                } else {
                    res.status(404).json({
                        err: 'Not an image',
                    });
                }
            });
        });

});


router.delete("/:filename", verifyToken, (req, res, next) => {
    const connect = mongoose.createConnection(
        process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true });
    
    connect.once('open', () => {
            // initialize stream
            const gfs = new mongoose.mongo.GridFSBucket(connect.db, {
                bucketName: "uploads"
            });
            gfs.find({ filename: req.params.filename }).toArray((err, files) => {
                if (err) {
                    return res.status(404).json({ err: err });
                } else {
                    gfs.delete(new mongoose.Types.ObjectId(files[0]._id), function (err, file) {
                        if (err) {
                            return res.status(404).json({ err: err });
                        }
                
                        res.status(200).json({
                            success: true,
                            message: `File is deleted`,
                        });
                    });
                }
            });
        });
    
});

export default router;