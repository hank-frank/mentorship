import { SingleMentee } from './singleMentee.model';
import { SubMentor } from './subMentor.model';

export interface MenteeData {
    currentUserData: {
        userData: SingleMentee;
        mentors?: Array<SubMentor>;
    };
}
