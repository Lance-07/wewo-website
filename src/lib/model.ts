interface TableData {
    id: number;
    date: string;
    waterDistribution: number,
    totalBottles: number,
    co2: number,
    bottles: {
        small: number,
        medium: number,
        large: number
    }
}

interface Article {
    id: number;
    title: string;
    image: string;
    description: string;
}

interface AdminUser {
    id: number;
    email: string;
    password: string;
    created_at: Date;
    loginAttempts: number;
    isLocked: boolean
}

interface PasswordReset {
    id: number;
    user_id: number;
    reset_token: string;
    expires_at: Date;
    created_at: Date;
}