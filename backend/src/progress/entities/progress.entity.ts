import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum CourseStatus {
  APPROVED = 'approved',
  FAILED = 'failed',
}

export enum SemesterPeriod {
  S1 = 'S1',
  S2 = 'S2',
  I = 'I',
  V = 'V',
}

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  courseCode: string;

  @Column({
    type: 'enum',
    enum: CourseStatus,
  })
  status: CourseStatus;

  @Column()
  year: number;

  @Column({
    type: 'enum',
    enum: SemesterPeriod,
  })
  period: SemesterPeriod;
}
