export const PORT:number = process.env.PORT ? +process.env.PORT:8080;
export const NODE_ENV:string = process.env.NODE_ENV? process.env.NODE_ENV: 'development';
export const DB_NAME: string = process.env.DB_NAME?process.env.DB_NAME:'prueba';
export const DB_USER:string = process.env.DB_USER?process.env.DB_USER:'root';
export const DB_PASSWORD:string = process.env.DB_PASSWORD?process.env.DB_PASSWORD:'password';
export const DB_HOST:string = process.env.DB_HOST?process.env.DB_HOST:'localhost';
export const AWS_REGION:string= process.env.AWS_REGION?process.env.AWS_REGION:'';
export const AWS_ACCESS_KEY:string= process.env.AWS_ACCESS_KEY?process.env.AWS_ACCESS_KEY:'';
export const AWS_SECRET_ACCESS_KEY:string= process.env.AWS_SECRET_ACCESS_KEY?process.env.AWS_SECRET_ACCESS_KEY:'';
export const AWS_SESSION_TOKEN:string= process.env.AWS_SESSION_TOKEN?process.env.AWS_SESSION_TOKEN:'';
export const COGNITO_APP_CLIENT_ID:string = process.env.COGNITO_APP_CLIANT_ID?process.env.COGNITO_APP_CLIANT_ID:'';
export const COGNITO_APP_SECRET_HASH:string= process.env.COGNITO_APP_SECRET_HASH?process.env.COGNITO_APP_SECRET_HASH:'';
export const COGNITO_USER_POOL_ID:string= process.env.COGNITO_USER_POOL_ID?process.env.COGNITO_USER_POOL_ID:'';
export const PREFIX_TABLE:string = NODE_ENV==='production'?'':'-DEV';

