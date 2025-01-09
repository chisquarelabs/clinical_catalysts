import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  f_name!: string;

  @Column({ nullable: true })
  l_name!: string;

  @Column()
  role!: string;

  @Column()
  otp!: number;

  @Column()
  user_id!: string;

  @Column({ nullable: true })
  physician_id!: string;

  @Column({ nullable: true })
  is_first_time!: boolean;
}
