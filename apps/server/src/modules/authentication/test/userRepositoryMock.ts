import { User } from '../user.entity';

export class UserRepositoryMock {
  private readonly data: { [k: string]: User } = {};
  private nexId = 1;

  async findOne(options: any): Promise<any> {
    const userDto = options.where;

    for (const prop in this.data) {
      if (this.data[prop].user_credential === userDto.user_credential) {
        return this.data[prop];
      }
    }
  }

  async save(user: User): Promise<User> {
    for (const prop in this.data) {
      if (this.data[prop].user_credential === user.user_credential) {
        throw new Error();
      }
    }

    user.id = this.nexId;
    this.data[user.id] = user;
    this.nexId++;
    return user;
  }
}
