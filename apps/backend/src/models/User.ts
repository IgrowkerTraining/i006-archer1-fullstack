export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  avatar: string;
}

class User {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  avatar: string;

  constructor({ id, name, email, password, username, avatar }: UserProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
    this.avatar = avatar;
  }

  toJSON(): Omit<UserProps, "password"> {
    const { password: _password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }

  static create(userData: UserData): User {
    const user = new User({
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      username: userData.email.split("@")[0],
      avatar: `https://picsum.photos/seed/${userData.email}/200`,
    });
    return user;
  }
}

export default User;
