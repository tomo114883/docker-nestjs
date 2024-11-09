export interface CreateFormProps {
  factors: string;
  state: () => void;
}

export type AuthForm = {
  email: string;
  password: string;
};
export type Factor = {
  id: number;
  name: string;
  weight: number;
  variable: boolean | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
