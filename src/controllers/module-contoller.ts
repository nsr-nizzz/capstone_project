import { Request, Response } from 'express';
const moduleService = require('../services/module-service');

// Ambil semua modul di course
exports.index = async (req: Request, res: Response) => {
  try {
    const { courseSlug } = req.params;
    const modules = await moduleService.getModulesByCourseSlug(courseSlug);

    if (!modules.length) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Modul tidak ditemukan untuk course ini',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Berhasil mendapatkan modul',
      data: modules,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Error internal server!' });
  }
};

// Ambil modul spesifik
exports.show = async (req: Request, res: Response) => {
  try {
    const { courseSlug, moduleSlug } = req.params;
    const module = await moduleService.getModuleBySlug(courseSlug, moduleSlug);

    if (!module) {
      return res.status(404).json({ statusCode: 404, message: 'Modul tidak ditemukan' });
    }

    return res.status(200).json({ statusCode: 200, message: 'Berhasil mendapatkan modul', data: module });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Error internal server!' });
  }
};

// Tambah modul
exports.create = async (req: Request, res: Response) => {
  try {
    const { courseSlug } = req.params;
    const newModule = await moduleService.addModule(courseSlug, req.body);

    return res.status(201).json({ statusCode: 201, message: 'Berhasil menambahkan modul', data: newModule });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Error internal server!' });
  }
};

// Update modul
exports.update = async (req: Request, res: Response) => {
  try {
    const { courseSlug, moduleSlug } = req.params;
    const updatedModule = await moduleService.updateModule(courseSlug, moduleSlug, req.body);

    if (!updatedModule) {
      return res.status(404).json({ statusCode: 404, message: 'Modul tidak ditemukan' });
    }

    return res.status(200).json({ statusCode: 200, message: 'Berhasil update modul', data: updatedModule });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Error internal server!' });
  }
};

// Hapus modul
exports.destroy = async (req: Request, res: Response) => {
  try {
    const { courseSlug, moduleSlug } = req.params;
    const deletedModule = await moduleService.deleteModule(courseSlug, moduleSlug);

    if (!deletedModule) {
      return res.status(404).json({ statusCode: 404, message: 'Modul tidak ditemukan' });
    }

    return res.status(200).json({ statusCode: 200, message: 'Berhasil hapus modul', data: deletedModule });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, message: 'Error internal server!' });
  }
};
