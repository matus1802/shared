import { DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ name: 'created' })
  created?: Date;

  @UpdateDateColumn({ name: 'updated' })
  updated?: Date;

  @DeleteDateColumn({ name: 'deleted' })
  deleted?: Date;
}
