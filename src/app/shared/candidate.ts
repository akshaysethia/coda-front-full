import { ExpertIn } from './expertin';

export class Candidate {
  admin: string = null;
  _id: string;
  name: string;
  email: string;
  votes: number;
  challenges: number;
  expertiselvl: number;
  expertin: ExpertIn[];
}
