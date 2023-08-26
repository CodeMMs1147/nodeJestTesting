import request from 'supertest';
import app from '../src/app';
import { response } from 'express';

describe('GET /tasks', () => {
    test('GET Debería responder con status 200', async () => {
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200);
    });

    test('GET Debe responder un array', async() => {
        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array)
    })
});

describe('POST /tasks', () => {

    describe('Tests where send Title & description', () => {

        const newTask = {
            title: 'Task title',
            description: 'Task Description'
        }

        //debe responder con un 200
        test('Should respond with a 200 status code', async() => {
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.statusCode).toBe(200)
        })

        //debe responder con un JSON Object
        test('Should have content-type: Application/JSON', async() => {
            const response = await request(app).post('/tasks').send(newTask)
            expect(response.header['content-type']).toEqual(
                expect.stringContaining('json')
            );
        })

        //debe responder con un JSON Object conteniendo un ID
        test('Should repond an Task ID', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        })
    })

    describe('When title & description is missing', () => {
        
        test('Should Respond With a 400 status code', async () => {

            const fields = [
                {},
                { title: 'Test task' },
                { description: 'Description' }
            ]

            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    })
})