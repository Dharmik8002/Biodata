export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export type MaritalStatus = 'never_married' | 'divorced' | 'widowed' | 'other';

export type DietType = 
  | 'vegetarian' 
  | 'non_vegetarian' 
  | 'eggetarian' 
  | 'vegan' 
  | 'other' 
  | 'prefer_not_to_disclose';

export type EmploymentType = 
  | 'private' 
  | 'government' 
  | 'business' 
  | 'self_employed' 
  | 'other' 
  | 'prefer_not_to_disclose';

export type FamilyType = 'nuclear' | 'joint' | 'other' | '';

export type ManglikStatus = 'yes' | 'no' | 'partial' | 'unknown' | 'prefer_not_to_disclose';

export type PhotoStyle = 'circle' | 'rounded' | 'rectangle';

export type LanguageCode = 'en' | 'hi' | 'gu';

export interface FamilyMemberItem {
  id: string;
  relation: string;
  name: string;
  details?: string;
}

export interface BiodataData {
  // Document Level
  title: string;
  religiousHeading?: string;
  language: LanguageCode;
  templateId: string;

  // Basic Information
  fullName: string;
  gender: Gender;
  dateOfBirth: string; // YYYY-MM-DD
  age: number;
  profileHeadline?: string;

  // Personal Details
  heightFeet?: string; // e.g. "5' 9\""
  heightCm?: string;   // e.g. "175 cm"
  weight?: string;     // e.g. "68 kg"
  bloodGroup?: string;
  complexion?: string;
  maritalStatus: MaritalStatus;
  religion: string;
  caste?: string;
  subCaste?: string;
  motherTongue: string;
  nationality: string;
  currentCity: string;
  currentState: string;
  currentCountry: string;
  nativePlace?: string;
  diet: DietType;

  // Education & Career
  highestQualification: string;
  degree?: string;
  collegeUniversity?: string;
  additionalQualifications?: string;
  occupation: string;
  jobTitle?: string;
  companyName?: string;
  businessDetails?: string;
  annualIncome?: string;
  incomeCurrency?: string;
  workLocation?: string;
  employmentType: EmploymentType;
  hideIncome: boolean;
  hideEmployer: boolean;

  // Family Details
  fatherName: string;
  fatherOccupation?: string;
  motherName: string;
  motherOccupation?: string;
  brothersCount: number;
  sistersCount: number;
  brothersDetails?: string;
  sistersDetails?: string;
  familyType?: FamilyType;
  familyStatus?: string;
  familyValues?: string;
  familyIntroduction?: string;
  familyResidence?: string;
  familyNativePlace?: string;
  additionalFamilyMembers: FamilyMemberItem[];

  // Horoscope Details (Optional)
  includeHoroscope: boolean;
  timeOfBirth?: string;
  placeOfBirth?: string;
  rashi?: string;
  nakshatra?: string;
  gotra?: string;
  manglikStatus?: ManglikStatus;
  horoscopeNotes?: string;
  additionalReligiousDetails?: string;

  // About Me & Lifestyle
  aboutMe?: string;
  hobbies?: string[];
  personality?: string;
  lifestyle?: string;
  languagesKnown?: string[];
  additionalInfo?: string;

  // Partner Preferences (Optional)
  includePartnerPreferences: boolean;
  partnerAgeMin?: number;
  partnerAgeMax?: number;
  partnerHeightRange?: string;
  partnerEducation?: string;
  partnerProfession?: string;
  partnerLocation?: string;
  partnerMotherTongue?: string;
  partnerCommunity?: string;
  partnerDiet?: string;
  partnerExpectations?: string;

  // Contact Details
  contactPersonName: string;
  relationship: string;
  primaryPhone: string;
  alternatePhone?: string;
  email?: string;
  contactCity: string;
  contactState?: string;
  contactCountry?: string;
  residentialAddress?: string;

  // Privacy Visibility Controls
  showPhone: boolean;
  showEmail: boolean;
  showAddress: boolean;

  // Profile Photo
  photoUrl?: string; // Data URL / base64
  photoStyle: PhotoStyle;
  photoZoom: number;
  photoPosition: { x: number; y: number };
}

export interface TemplateMetadata {
  id: string;
  name: string;
  category: 'traditional' | 'modern' | 'royal' | 'minimal' | 'floral' | 'community';
  description: string;
  tags: string[];
  accentColor: string;
  secondaryColor: string;
  isPopular?: boolean;
}
