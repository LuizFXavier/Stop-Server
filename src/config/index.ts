export const config = {
    MODE: process.env.NODE_ENV,
    PORT: process.env.PORT,
    db: {
        storage: process.env.DB_STORAGE,
    }
};