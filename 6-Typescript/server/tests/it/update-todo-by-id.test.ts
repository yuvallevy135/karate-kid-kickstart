import { TestKit } from "../env/TestKit";
import { createTodo } from "../env/mockData";
import { ITodo } from "../../interfaces/interfaces";
import { AxiosError } from "axios";
const testKit = new TestKit();
describe("PUT todo by id /api/todos/:id ", () => {
    testKit.beforeAndAfter();

    it("given no id of todo in db should return 404", async () => {
        let todo: ITodo = createTodo();
        await testKit.mongoDriver.modelPostTodo(todo);
        testKit.appDriver.setUserId(todo.userId);
        todo.checked = true;
        todo.todoId = "sdgsdf";

        try {
            const response = await testKit.appDriver.updateTodoById(todo);
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404);
        }
    });

    it("should return 200, given todo with id to update in db", async () => {
        let todo: ITodo = createTodo();
        await testKit.mongoDriver.modelPostTodo(todo);
        testKit.appDriver.setUserId(todo.userId);
        todo.checked = true;

        const response = await testKit.appDriver.updateTodoById(todo);
        expect(response.status).toBe(200);
    });
});
