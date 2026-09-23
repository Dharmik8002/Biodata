import { z } from 'zod';

export const biodataValidationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name is required (at least 2 characters)' })
    .max(80, { message: 'Full name must not exceed 80 characters' }),
  
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
    required_error: 'Please select a gender',
  }),

  dateOfBirth: z
    .string()
    .refine((val) => !val || !isNaN(new Date(val).getTime()), {
      message: 'Please provide a valid date of birth',
    }),

  primaryPhone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(20, { message: 'Phone number is too long' })
    .optional()
    .or(z.literal('')),

  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .optional()
    .or(z.literal('')),

  partnerAgeMin: z.number().min(18).max(70).optional(),
  partnerAgeMax: z.number().min(18).max(70).optional(),
}).refine(
  (data) => {
    if (data.partnerAgeMin && data.partnerAgeMax) {
      return data.partnerAgeMin <= data.partnerAgeMax;
    }
    return true;
  },
  {
    message: 'Minimum preferred age cannot be greater than maximum preferred age',
    path: ['partnerAgeMin'],
  }
);

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload a JPG, PNG, or WebP image.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit. Please choose a smaller photo.',
    };
  }

  return { valid: true };
}
