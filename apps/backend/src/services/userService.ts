import User, { UserData } from "../models/User";

class UserService {
  private users: User[] = [];

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  async create(userData: UserData): Promise<User> {
    const existingUser = this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = User.create(userData);
    this.users.push(newUser);
    return newUser;
  }

  async authenticate(email: string, password: string): Promise<User> {
    const user = this.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }
    return user;
  }

  getAllUsers(): Omit<import("../models/User").UserProps, "password">[] {
    return this.users.map((user) => user.toJSON());
  }
}

export default new UserService();
