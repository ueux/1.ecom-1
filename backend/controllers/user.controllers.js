import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });

    return { accessToken};
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (
    [ email, username, password].some((field) => field?.trim() === "")
    // !username ||
    // !email ||
    // !password
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }
  const user = await User.create({
    email,
    password,
    username:username.toLowerCase(),
  });
  const { accessToken} = await generateAccessToken(
    user._id
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: 'strict',
    maxAge:30*24*60*60*1000
  };
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200,  {
      user: createdUser,
      accessToken,

    }, "User registered Successfully"));
});
export { createUser };
