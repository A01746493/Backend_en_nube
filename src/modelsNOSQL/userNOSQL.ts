import dynamodb from '../services/dynamoService';
import joi from 'joi';
import { PREFIX_TABLE } from '../config';

const ClientModel = dynamodb.define('client',{
    hashKey:'awsCognitoId',
    timestamps:true,
    schema:{
        awsCognitoId: joi.string().required(),
		name: joi.string().required(),
		last_name: joi.string().required(),
		email: joi.string().required().email(),
		no_cuenta:joi.number().required(),
        saldo:joi.number().required()
    },
    tableName:`Client${PREFIX_TABLE}`,
    indexes: [
		{
			hashKey: 'email',
			name: 'EmailIndex',
			type: 'global',
		},
	],
});



/* dynamodb.createTables((err:any)=>{
    if(err)
        return console.log('Error al crear la tabla',err);
    console.log('Tabla creada exitosamente');
}) */

export default ClientModel;