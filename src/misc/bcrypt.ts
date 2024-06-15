import * as bcrypt from 'bcrypt';

export class BcryptService {
  static async bcryptCompare(
    password: String,
    userPassword: String,
  ): Promise<String> {
    return bcrypt.compare(password, userPassword);
  }

  static async bcrypthash(password: String): Promise<String> {
    return bcrypt.hash(password, +process.env.SALT_ROUNDS);
  }
}
