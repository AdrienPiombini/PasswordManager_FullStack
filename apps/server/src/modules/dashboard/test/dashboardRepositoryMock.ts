import { Dashboard } from '../dashboard.entity';

export class DashboardRepositoryMock {
  private readonly data: { [k: string]: Dashboard } = {};
  private nextId = 1;

  async find(options: any): Promise<any> {
    const {
      where: { user_credential },
    } = options;

    const result: Dashboard[] = [];
    for (const prop in this.data) {
      if (
        this.data[prop].user_credential.user_credential ===
        user_credential.user_credential
      ) {
        result.push(this.data[prop]);
      }
    }
    return result;
  }

  async findOne(options: any): Promise<any> {
    const {
      where: { user_credential, id },
    } = options;

    for (const prop in this.data) {
      if (
        this.data[prop].user_credential === user_credential &&
        this.data[prop].id === +id
      )
        return this.data[prop];
    }
  }

  async save(dashboard: Dashboard) {
    dashboard.id = this.nextId;
    this.data[dashboard.id] = dashboard;
    this.nextId++;
    return dashboard;
  }

  async remove(dashboard: Dashboard) {
    const key = dashboard.id;
    if (this.data[key]) {
      delete this.data[key];
    }
  }
}
