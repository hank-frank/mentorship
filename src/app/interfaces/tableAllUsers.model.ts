import { SingleMentee } from './singleMentee.model';
import { SingleMentor } from './singleMentor.model';

export interface TableUsers {
    userData: SingleMentee | SingleMentor;
    // columnHeaders?: Array<string>;
    // tableTitle?: string;
    // rowColors?: Array<string>;
}
