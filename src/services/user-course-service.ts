import { UserCourse } from '../models/user-course-model';

export const enrollUserToCourse = async (userId: number, courseId: number) => {
  return await UserCourse.query().insert({
    user_id: userId,
    course_id: courseId
  });
};
