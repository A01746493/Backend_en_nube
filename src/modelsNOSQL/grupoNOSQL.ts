import dynamodb from 'dynamodb';
import joi from 'joi';
import { PREFIX_TABLE, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, AWS_REGION} from '../config';

/*
const GrupoMode = dynamodb.define('grupo',{
    hashkey: 'GrupoId',
    timestamps: false,
    schema:{
        GrupoId: dynamodb.types.uuid(),
        poblacion:joi.number(),
        matera:joi.string()
    },
    tableName: `Grupo${PREFIX_TABLE}`
});
*/
