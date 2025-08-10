import { Course } from '../models/course-model';
import { generateSlugModule } from '../utilities/slug';
const moduleRepository = require('../repositories/module-repository');
const filesystem = require('../utilities/filesystem');

// Ambil semua modul di course
exports.getModulesByCourseSlug = async (courseSlug: string) => {
  return await moduleRepository.getModulesByCourseSlug(courseSlug);
};

// Ambil modul spesifik
exports.getModuleBySlug = async (courseSlug: string, moduleSlug: string) => {
  return await moduleRepository.getModuleBySlug(courseSlug, moduleSlug);
};

// Tambah modul baru (support PDF & image)
exports.addModule = async (courseSlug: string, input: any) => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) throw new Error('Course tidak ditemukan');

  input.course_id = course.id;
  input.slug = generateSlugModule(input.title);

  // Upload file jika ada (PDF atau image)
  if (input.files && input.files.length > 0) {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
    const file = input.files.find((f: any) => allowedTypes.includes(f.mimetype));

    if (file) {
      const filePath = await filesystem.upload(file, 'modules');
      input.content = filePath; // simpan path/URL file
    }
  }
  delete input.files;

  return await moduleRepository.addModule(input);
};

// Update modul (support ganti PDF & image, hapus file lama)
exports.updateModule = async (courseSlug: string, moduleSlug: string, input: any) => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) throw new Error('Course tidak ditemukan');

  if (input.title) {
    input.slug = generateSlugModule(input.title);
  }

  // Upload file baru jika ada
  if (input.files && input.files.length > 0) {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
    const file = input.files.find((f: any) => allowedTypes.includes(f.mimetype));

    if (file) {
      // Ambil module lama untuk hapus file lama
      const oldModule = await moduleRepository.getModuleBySlug(courseSlug, moduleSlug);
      if (oldModule && oldModule.content) {
        await filesystem.remove(oldModule.content);
      }

      const filePath = await filesystem.upload(file, 'modules');
      input.content = filePath;
    }
  }
  delete input.files;

  return await moduleRepository.updateModule(course.id, moduleSlug, input);
};

// Hapus modul
exports.deleteModule = async (courseSlug: string, moduleSlug: string) => {
  const course = await Course.query().findOne({ slug: courseSlug });
  if (!course) throw new Error('Course tidak ditemukan');

  // Hapus file dari storage jika ada
  const oldModule = await moduleRepository.getModuleBySlug(courseSlug, moduleSlug);
  if (oldModule && oldModule.content) {
    await filesystem.remove(oldModule.content);
  }

  return await moduleRepository.deleteModule(course.id, moduleSlug);
};
