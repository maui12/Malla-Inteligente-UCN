import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
@Index(['studentId', 'courseCode', 'year', 'period'], { unique: true })
export class CoursePreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  courseCode: string;

  @Column()
  year: number;

  @Column() 
  period: string;

  @Column({ default: 'WANT' })
  kind: 'WANT';
}
