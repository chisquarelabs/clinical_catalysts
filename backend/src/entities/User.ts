import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  f_name!: string;

  @Column()
  l_name!: string;

  @Column()
  role!: string;

  @Column()
  otp!: number;

  @Column()
  user_id!: string;
}
