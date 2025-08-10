import { User } from '../models/user-model';

// Cari user berdasarkan ID
exports.findUserById = async (id: number) => {
  return await User.query().findById(id);
};

// Ambil semua user
exports.getUsers = async () => {
  return await User.query();
};

// Update user
exports.updateUserById = async (id: number, input: Partial<User>) => {
  return await User.query().patchAndFetchById(id, input);
};

// Hapus user (soft delete)
exports.deleteUserById = async (id: number) => {
  return await User.query().deleteById(id);
};
