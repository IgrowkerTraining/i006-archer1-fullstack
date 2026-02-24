import prisma  from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface RegisterDTO {
  fullname: string;
  email: string;
  password: string;
  country?: string;
  istechnician: boolean;
  registrationnumber?: string;
}

class UserService {

  async register(data: RegisterDTO) {

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      fullname: data.fullname,
      email: data.email,
      passwordhash: hashedPassword,
      country: data.country,
      istechnician: data.istechnician,
      registrationnumber: data.registrationnumber
    },
    select: {
      id: true,
      fullname: true,
      email: true,
      country: true,
      istechnician: true,
      registrationnumber: true
    }
  });

  return user;
}

  //LOGIN
  async login(email: string, password: string) {

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordhash);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email , istechnician : user.istechnician },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      user: {
        id: user.id,
        istechnician: user.istechnician,
        fullname: user.fullname,
        email: user.email
      },
      token
    };
  }

}

export default new UserService();