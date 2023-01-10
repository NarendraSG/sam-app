import { Schema, model } from 'dynamoose';

const schema = new Schema(
    {
        id: {
            type: Number,
            hashKey: true,
        },
        desc: { type: String, required: true },
    },
    {
        saveUnknown: true,
        timestamps: true,
    },
);

export const Task = model('nv_Task', schema);
