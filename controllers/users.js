import UserInfo from "../models/UserInfo.js";

/* READ */
export const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserInfo.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
