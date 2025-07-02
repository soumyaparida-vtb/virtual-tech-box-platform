//The below line-2 is added as a fix please review it later.
import { LearningArea } from "./learning";

// types/user.ts
export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  selectedArea: LearningArea;
  registeredAt?: string;
}

export interface UserRegistration {
  name: string;
  email: string;
  phoneNumber: string;
  learningArea: string;
}