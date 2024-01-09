import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ILocation, IPollution, IWeather } from '../interfaces';

@Entity('iqair')
export class IqairEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ type: 'json' })
  location: ILocation;

  @Column({ type: 'json' })
  pollution: IPollution;

  @Column({ type: 'json' })
  weather: IWeather;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;
}
