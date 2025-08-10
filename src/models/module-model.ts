const Model = require('../config/database/orm');
import { Course } from './course-model';

export class Module extends Model {
  static softDelete = true;
  static tableName = 'modules';

  id?: number;
  course_id!: number;
  title!: string;
  slug!: string;
  description!: string;
  content?: string;
  order!: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static relationMappings = {
    course: {
      relation: Model.BelongsToOneRelation,
      modelClass: Course,
      join: {
        from: 'modules.course_id',
        to: 'courses.id',
      },
    },
  };
}
