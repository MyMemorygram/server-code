import BucketListItem from "../models/BucketListItem.js";

export const createBucketListItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemDescription } = req.body;
        const newBucketListItem = new BucketListItem({
            userId,
            itemDescription,
            status: false
        });
        await newBucketListItem.save();

        const bucketListItems = await BucketListItem.find({ userId });
        res.status(201).json(bucketListItems);

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const getBucketListItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const bucketListItems = await BucketListItem.find({userId});
        res.status(200).json(bucketListItems);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateBucketListItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { itemDescription, status } = req.body;
        const item = await BucketListItem.findById(id);
        if(item.userId === userId) {
            const bucketListItem = await BucketListItem.findByIdAndUpdate(id, {
                userId,
                itemDescription,
                status
            }, { new: true });
            res.status(200).json(bucketListItem);
        }
        else 
        res.status(404).json({ message: "Unauthorized Access" });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteBucketListItem = async (req, res) => {
    try {
        // console.log(req);
        const userId = req.user.id;
        const { id } = req.params;
        const bucketListItem = await BucketListItem.findById(id);
        console.log(bucketListItem);
        if(bucketListItem) {
            if(bucketListItem.userId === userId) {
                await BucketListItem.findByIdAndDelete(id);
                const bucketListItems = await BucketListItem.find({userId});
                res.status(200).json(bucketListItems);
            }
            else res.status(404).json({ message: "Unauthorized Access" });
        }
        else res.status(404).json({ message: "Item with id doesn't exist" });
        

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
