import { Course } from '../models/course-model';
import { generateSlugModule } from '../utilities/slug';
const moduleRepository = require('../repositories/module-repository');

exports.getModulesByCourseSlug = async (courseSlug: string) => {
  return await moduleRepository.getModulesByCourseSlug(courseSlug);
};

exports.getModuleBySlug = async (courseSlug: string, moduleSlug: string) => {
  return await moduleRepository.getModuleBySlug(courseSlug, moduleSlug);
};

exports.addModule = async (courseSlug: string, input: any) => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) throw new Error('Course tidak ditemukan');

  input.course_id = course.id;
  input.slug = generateSlugModule(input.title);

  return await moduleRepository.addModule(input);
};

exports.updateModule = async (courseSlug: string, moduleSlug: string, input: any) => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) throw new Error('Course tidak ditemukan');

  if (input.title) {
    input.slug = generateSlugModule(input.title);
  }

  return await moduleRepository.updateModule(course.id, moduleSlug, input);
};

exports.deleteModule = async (courseSlug: string, moduleSlug: string) => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) throw new Error('Course tidak ditemukan');

  return await moduleRepository.deleteModule(course.id, moduleSlug);
};
