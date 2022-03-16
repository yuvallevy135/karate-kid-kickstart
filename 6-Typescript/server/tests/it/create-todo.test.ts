import { createTodo, createTodoWithMissingChecked } from "../env/mockData";
import { TestKit } from "../env/TestKit";
import { ITodo } from "../../interfaces/interfaces";
import { AxiosError } from "axios";
describe("POST new todo /api/todos ", () => {
    const testKit = new TestKit();
    testKit.beforeAndAfter();

    it("should return 201 and that todo is equal to the one we inserted, given new todo to create", async () => {
        const todo: ITodo = createTodo();
        testKit.appDriver.setUserId(todo.userId);

        const response = await testKit.appDriver.addTodo(todo);
        const checkTodoInDb: ITodo | null =
            await testKit.mongoDriver.modelGetTodoById(
                todo.userId,
                todo.todoId
            );
        expect(checkTodoInDb).toEqual(todo);
        expect(response.status).toBe(201);
    });

    it("should return 400, given todo with missing value in payload", async () => {
        const todo: Partial<ITodo> = createTodoWithMissingChecked();
        testKit.appDriver.setUserId(todo.userId);

        try {
            const response = await testKit.appDriver.addTodo(todo);
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(400);
        }
    });
});
