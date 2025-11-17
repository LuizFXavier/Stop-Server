declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: number,
        DB_URL: string,
        API_KEY: string
        MAIL_USER: string,
        MAIL_PASS: string,
        SECRET: string
    }
}