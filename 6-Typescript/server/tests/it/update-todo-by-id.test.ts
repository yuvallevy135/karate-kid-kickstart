import { TestKit } from '../env/TestKit';
import {createTodo} from '../env/random'
import { ITodo } from '../../interfaces/ITodo';
const testKit = new TestKit()
describe("PUT todo by id /api/todos/:id ", () => {
testKit.beforeAndAfter();

    describe("given no id of todo in db", () => {
        it("should return 404", async () => {
            let todo: ITodo = createTodo()            
            await testKit.mongoDriver.modelPostTodo(todo)
            testKit.appDriver.setUserId(todo.userId)
            todo.checked = true
            todo.todoId = 'sdgsdf' 
            try{
                const response = await testKit.appDriver.updateTodoById(todo) 
            }
            catch(err: any) {           
                expect(err.response.status).toBe(404);
            }
        })
    })

    describe("given todo with id to update in db", () => {
        it("should return 200", async () => {
            let todo: ITodo = createTodo()            
            await testKit.mongoDriver.modelPostTodo(todo)
            testKit.appDriver.setUserId(todo.userId)
            todo.checked = true
            const response = await testKit.appDriver.updateTodoById(todo) 
            expect(response.status).toBe(200);
        })
    })
    
})