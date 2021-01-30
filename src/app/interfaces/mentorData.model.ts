import { SingleMentor } from './singleMentor.model';
import { SubMentee } from './subMentee.model';

export interface MentorData {
    currentUserData: {
        userData: SingleMentor;
        mentees?: Array<SubMentee>;
    };
}
