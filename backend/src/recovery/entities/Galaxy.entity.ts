import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GuardiansOfTheGalaxy } from "./GuardiansOfTheGalaxy.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Galaxy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  recoveryAddress: string; // The address that will be added to the recovered wallet

  @OneToMany(() => GuardiansOfTheGalaxy, (guardian) => guardian.galaxy, { cascade: true })
  @Exclude()
  guardians: GuardiansOfTheGalaxy[];
}