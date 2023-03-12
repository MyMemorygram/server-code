import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        profilePicturePath: {
            type: String,
            default: "",
        },
        location: String,
        bioDescription: String,
    },
    {timestamps: true}
);

const UserInfo = mongoose.model("User", UserInfoSchema);
export default UserInfo;