import USER from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await USER.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({
      message: "Users fetched successfully.",
      filterUsers,
    });
  } catch (error) {
    console.log(error.message, "Error in getting user");
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
