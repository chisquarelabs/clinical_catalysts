import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @Column()
  encounderType!: string;

  @Column()
  note!: string;

  @Column()
  noteCategory!: string;

  @Column()
  date!: Date;
  
  @Column()
  physicianId!: string;
}
