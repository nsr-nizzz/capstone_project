/**
 * Generate slug dari string title
 * Contoh: "Belajar JavaScript Dasar" → "belajar-javascript-dasar"
 */
export function generateSlugCourse(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // ganti spasi dengan tanda -
    .replace(/[^\w\-]+/g, '')    // hapus karakter non-alphanumeric
    .replace(/\-\-+/g, '-');     // ganti multiple - dengan single -
}

/**
 * Generate slug dari string title
 */
export function generateSlugModule(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // ganti spasi jadi -
    .replace(/[^\w\-]+/g, '')    // hapus karakter non-alphanumeric
    .replace(/\-\-+/g, '-');     // ganti multiple - jadi single -
}
