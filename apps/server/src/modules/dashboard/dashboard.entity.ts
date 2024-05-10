import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../authentication/user.entity';

@Entity('data')
export class Dashboard extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  identifiant: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  user_secret: string;

  @Column({
    type: 'varchar',
  })
  website: string;

  // @Column({
  //   type: 'varchar',
  // })
  // user_credential: User;

  @ManyToOne(() => User, (user) => user.dashboards)
  user_credential: User;
}
