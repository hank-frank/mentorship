import { MenteeData } from './menteeData.model';
import { MentorData } from './mentorData.model';
import { MentorStats } from './adminMentorStats.model';
import { MenteeStats } from './adminMenteeStats.model';

export interface AdminData {
    currentUserData: {
        userData: {
            userId: number;
            name: string;
            role: string;
        };
        stats: {
            mentor: MentorStats;
            mentee: MenteeStats;
        };
    };
    allUsers: Array<MenteeData | MentorData>;
}
