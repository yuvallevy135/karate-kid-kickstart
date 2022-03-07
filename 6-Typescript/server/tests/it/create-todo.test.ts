import { createTodo, createTodoWithMissingChecked } from './../env/random';
import { TestKit } from '../env/TestKit';
import { ITodo } from '../../interfaces/ITodo';
describe("POST new todo /api/todos ", () => {
    const testKit = new TestKit()
    testKit.beforeAndAfter();

    describe("given new todo to create ", () => {
        it("should return 201 and that todo is equal to the one we inserted", async () => {            
            const todo: ITodo = createTodo()
            testKit.appDriver.setUserId(todo.userId)
            const response = await testKit.appDriver.addTodo(todo)
            const checkTodoInDb: ITodo | null = await testKit.mongoDriver.modelGetTodoById(todo.userId ,todo.todoId)
            expect(checkTodoInDb).toEqual(todo);
            expect(response.status).toBe(201);
        })
    })


    describe("given todo with missing value in payload ", () => {
        it("should return 400", async () => {            
            const todo:Partial<ITodo> = createTodoWithMissingChecked()
            testKit.appDriver.setUserId(todo.userId)
            try {
                const response = await testKit.appDriver.addTodo(todo)
            } catch(err: any) {                
                expect(err.response.status).toBe(400);
            }
        })
    })    
})