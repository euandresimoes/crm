export const secret = process.env.JWT_SECRET as string;

if (!secret)
    throw new Error('\n\n<========= JWT secret missing. =========>\n\n');