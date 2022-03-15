import { TestKit } from "../env/TestKit";
import { createTodo } from "../env/mockData";
import { times } from "lodash";
import { ITodo } from "../../interfaces/interfaces";
import { AxiosError } from "axios";
const testKit = new TestKit();
describe("GET todo by id /api/todos/:id ", () => {
    testKit.beforeAndAfter();

    it("given no id of todo in db should return 404", async () => {
        const todo: ITodo = createTodo();
        await testKit.mongoDriver.modelPostTodo(todo);
        const userId: string = todo.userId;
        testKit.appDriver.setUserId(userId);

        try {
            const response = await testKit.appDriver.getTodoById("asd");
        } catch (err) {
            expect((err as AxiosError).response!.status).toBe(404);
        }
    });

    it("given todo with id in db should return the todo and status 200", async () => {
        const todos: ITodo[] = times(3, () => createTodo());
        await Promise.all(
            todos.map((todo) => testKit.mongoDriver.modelPostTodo(todo))
        );
        testKit.appDriver.setUserId(todos[1].userId);

        const response = await testKit.appDriver.getTodoById(todos[1].todoId);
        expect(response.data).toEqual(todos[1]);
        expect(response.status).toBe(200);
    });
});
