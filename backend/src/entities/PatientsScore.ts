import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PatientsScore {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  questionId!: string;

  @Column()
  subSectionId!: string;

  @Column()
  score!: number;
}
