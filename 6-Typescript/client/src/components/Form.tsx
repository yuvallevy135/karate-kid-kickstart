import React, {
    ChangeEvent,
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
} from "react";
import CustomeButton from "./CustomeButton/CustomeButton";
import "../styles/styles.css";

interface FormProps {
    inputText: string;
    setInputText: Dispatch<SetStateAction<string>>;
    onAddTodo: () => Promise<void>;
}

const Form: FC<FormProps> = ({ inputText, setInputText, onAddTodo }) => {
    const inputTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.currentTarget.value);
    };
    const addTodoHandler = async (
        e: FormEvent<HTMLButtonElement>
    ): Promise<void> => {
        e.preventDefault();
        onAddTodo();
    };

    return (
        <form className="task-form" >
            <input
                type="text"
                className="new-task-input"
                id="new-task-input"
                placeholder="Add a task"
                onChange={inputTextHandler}
                value={inputText}
                
            />
            <CustomeButton
                className={"todo-button button-style"}
                icon={"fas fa-plus"}
                buttonType="submit"
                onClickHandler={addTodoHandler}
            ></CustomeButton>
        </form>
    );
};

export default Form;
