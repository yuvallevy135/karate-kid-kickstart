import { TestKit } from "../env/TestKit";
import { createTodo, createTodoId } from "../env/mockData";
import { ITodo } from "../../interfaces/interfaces";
import { AxiosError } from "axios";
const testKit = new TestKit();
describe("DELETE todo by id /api/todos/:id ", () => {
    testKit.beforeAndAfter();

    it("should return 404, given no id of todo in db", async () => {
        let todo: ITodo = createTodo();
        await testKit.mongoDriver.modelPostTodo(todo);
        testKit.appDriver.setUserId(todo.userId);

        todo.todoId = createTodoId();
        try {
            const response = await testKit.appDriver.deleteTodoById(
                todo.todoId
            );
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404);
        }
    });

    it("should return 200, given todo with to delete that in db", async () => {
        let todo: ITodo = createTodo();
        await testKit.mongoDriver.modelPostTodo(todo);
        testKit.appDriver.setUserId(todo.userId);

        const response = await testKit.appDriver.updateTodoById(todo);
        expect(response.status).toBe(200);
    });
});
