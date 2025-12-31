declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            MONGO_URI: string;
            JWT_SECRET: string;
            NODE_ENV?: string;
            PAYPAL_CLIENT_ID: string;
        }
    }
}

export { };
