import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Answers {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  questionId!: string;

  @Column()
  response!: string;
}
