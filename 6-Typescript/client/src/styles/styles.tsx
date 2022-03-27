export const styles = {
    todoListItem: {
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        padding: "15px",
        "font-size": "1.5rem",
        "border-bottom": "1px solid lightgrey",
        "border-top": "1px solid lightgrey",
    },
    todoItemText: {
        "flex-grow": "1",
        height: "30px",
        width: "250px",
        border: "none",
        outline: "0",
        margin: "0",
        padding: "1px 2px",
        "white-space": "nowrap",
        overflow: "hidden",

        "font-size": "1.5rem",
        "font-weight": "normal",
        "font-family": "Lucida Casual",
    },
    todoItemInput: {
        "flex-grow": "1",
        height: "30px",
        border: "none",
        outline: "0",
        "font-size": "1.5rem",
        "font-family": "Lucida Casual",
    },
    completed: {
        "text-decoration": "line-through",
    },
    checked: {
        margin: "20px",
        cursor: "pointer",
    },
};
