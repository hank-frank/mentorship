export interface SingleMentee {
    userId: number;
    name: string;
    role: string;
    onboarding: boolean;
    matched: boolean;
    introduced: boolean;
    schedule: boolean;
    smart: boolean;
    sessions: number;
    sessionsPossible: number;
    lifetimeSessions: number;
    lifetimeSessionsPossible: number;
    rating: number;
    isFinished: boolean;
    jobTitle: string;
    company: string;
}
