import { SingleMentor } from './singleMentor.model';

export interface SubMentor {
    userData: SingleMentor;
    mentees: Array<number>;
}
