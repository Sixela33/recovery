import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Galaxy } from "./Galaxy.entity";

@Entity()
export class GuardiansOfTheGalaxy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  account: string;

  @Column()
  phrase: string;

  @Column()
  privateKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Galaxy, (galaxy) => galaxy.guardians)
  galaxy: Galaxy;
}