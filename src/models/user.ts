import { Schema, model } from 'dynamoose';

const schema = new Schema(
    {
        id: {
            type: Number,
            hashKey: true,
        },
        age: { type: Number, required: true },
    },
    {
        saveUnknown: true,
        timestamps: true,
    },
);

export const User = model('nv_User', schema);
