import express, { Express } from 'express'
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_KEY: string;
            PORT?: any;
            GITHUB_AUTH_TOKEN: string;
            NODE_ENV: 'development' | 'production';
            PWD: string;
        }
    }
}