import { TestKit } from '../env/TestKit';
import {createTodo} from '../env/random'
import { ITodo } from '../../interfaces/ITodo';
const testKit = new TestKit()
describe("DELETE todo by id /api/todos/:id ", () => {
testKit.beforeAndAfter();

    describe("given no id of todo in db", () => {
        it("should return 404", async () => {
            let todo: ITodo = createTodo()            
            await testKit.mongoDriver.modelPostTodo(todo)
            testKit.appDriver.setUserId(todo.userId)
            todo.todoId = 'sdgsdf' 
            try{
                const response = await testKit.appDriver.deleteTodoById(todo.todoId) 
            }
            catch(err: any) {     
                expect(err.response.status).toBe(404);
            }
        })
    })

    describe("given todo with to delete that in db", () => {
        it("should return 200", async () => {
            let todo: ITodo = createTodo()            
            await testKit.mongoDriver.modelPostTodo(todo)
            testKit.appDriver.setUserId(todo.userId)
            const response = await testKit.appDriver.updateTodoById(todo)             
            expect(response.status).toBe(200);
        })
    })
    
})