import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  physicianId!: string;

  @Column()
  note!: string;

  @Column()
  noteCategory!: string;

  @Column()
  date!: Date;
}
