import { Response } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request-type';
import * as userCourseService from '../services/user-course-service';

export const enroll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    let { user_id, course_id } = req.body;

    // Jika user adalah student, pakai ID dari token
    if (req.user.role === 'student') {
      user_id = req.user.id;
    }

    if (!user_id || !course_id) {
      return res.status(400).json({
        statusCode: 400,
        message: 'course_id wajib diisi! (user_id opsional, otomatis untuk student)'
      });
    }

    const data = await userCourseService.enrollUserToCourse(user_id, course_id);

    return res.status(201).json({
      statusCode: 201,
      message: 'Berhasil mendaftarkan user ke course',
      data
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error internal server'
    });
  }
};
