const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email not registerd" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      token: token,
    });
  } catch (e) {
    console.log(`error: ${e}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const userRegistration = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const salt = 10;

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      age: age,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        age: savedUser.age,
        role: savedUser.role,
      },
    });
  } catch (e) {
    console.log(`error : ${e}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { userLogin, userRegistration };
