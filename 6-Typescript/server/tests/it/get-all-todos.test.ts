import { times } from "lodash";
import { ITodo } from "../../interfaces/interfaces";
import { createTodo, createUserId } from "../env/mockData";
import { TestKit } from "../env/TestKit";
describe("GET all todos /api/todos/ ", () => {
    const testKit = new TestKit();
    testKit.beforeAndAfter();

    it("given no todos in database should return empty array and status 200", async () => {
        const userId: string = createUserId();
        testKit.appDriver.setUserId(userId);

        const response = await testKit.appDriver.getAllTodos();
        expect(response.status).toBe(200);
        expect(response.data).toEqual([]);
    });

    it("given todos in db should return array of todos and status 200", async () => {
        const todos: ITodo[] = times(3, () => createTodo());
        await Promise.all(
            todos.map((todo) => testKit.mongoDriver.modelPostTodo(todo))
        );
        testKit.appDriver.setUserId(todos[0].userId);

        const response = await testKit.appDriver.getAllTodos();
        expect(response.status).toBe(200);
        expect(response.data).toEqual([todos[0]]);
    });
});
