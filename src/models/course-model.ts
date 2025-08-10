const Model = require('../config/database/orm');
import { Module as CourseModule } from './module-model';

export class Course extends Model {
  static softDelete = true;
  static tableName = 'courses';

  id?: number;
  title!: string;
  slug!: string;
  description!: string;
  image!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static relationMappings = {
    modules: {
      relation: Model.HasManyRelation,
      modelClass: CourseModule,
      join: {
        from: 'courses.id',
        to: 'modules.course_id',
      },
    },
  };
}
