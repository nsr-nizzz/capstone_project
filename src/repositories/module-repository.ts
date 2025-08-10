import { Module } from '../models/module-model';
import { Course } from '../models/course-model';

exports.getModulesByCourseSlug = async (courseSlug: string): Promise<Module[]> => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) return [];
  return await Module.query().where('course_id', course.id).orderBy('order', 'asc');
};

exports.getModuleBySlug = async (courseSlug: string, moduleSlug: string): Promise<Module | undefined> => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) return undefined;
  return await Module.query().where('course_id', course.id).andWhere('slug', moduleSlug).first();
};

exports.addModule = async (data: Partial<Module>): Promise<Module> => {
  return await Module.query().insert(data);
};

exports.updateModule = async (courseId: number, moduleSlug: string, data: Partial<Module>): Promise<Module | undefined> => {
  return await Module.query().patch(data).where('course_id', courseId).andWhere('slug', moduleSlug).returning('*').first();
};

exports.deleteModule = async (courseId: number, moduleSlug: string): Promise<number> => {
  return await Module.query().delete().where('course_id', courseId).andWhere('slug', moduleSlug);
};
