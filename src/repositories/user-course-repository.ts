import { UserCourse } from '../models/user-course-model';

exports.getEnrolledCoursesByUserId = async (userId: number) => {
  return await UserCourse.query()
    .where('user_id', userId)
    .withGraphFetched('course'); // ikut ambil data course
};
