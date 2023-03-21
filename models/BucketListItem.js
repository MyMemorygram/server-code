import mongoose from "mongoose";

const bucketListItemSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    status: Boolean
  }
);

const BucketListItem = mongoose.model("BucketListItem", bucketListItemSchema);

export default BucketListItem;