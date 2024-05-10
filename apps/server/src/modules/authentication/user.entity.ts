import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Dashboard } from '../dashboard/dashboard.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  user_credential: string;

  @Column({
    type: 'varchar',
  })
  user_password: string;

  @Column({
    type: 'varchar',
  })
  updated_at: string;

  @Column({
    type: 'varchar',
  })
  created_at: string;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user_credential)
  dashboards: Dashboard[];

  static builder(data: Partial<User>) {
    const user = new User();
    Object.assign(user, data);
    return user;
  }
}
