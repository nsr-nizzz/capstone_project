import { Request, Response } from 'express';
import * as userCourseService from '../services/user-course-service';

export const enroll = async (req: Request, res: Response) => {
  try {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({
        statusCode: 400,
        message: 'user_id dan course_id wajib diisi!'
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
