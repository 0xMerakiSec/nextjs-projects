import connectDB from "@/config/db.config";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    console.log(requestBody);
    const { email, password } = requestBody;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    //verify the password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      { message: "Login successfull" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true, secure: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
