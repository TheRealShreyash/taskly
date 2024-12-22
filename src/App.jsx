import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [currentTime, setCurrentTime] = useState();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const formatDate = () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const handleSave = () => {
    setTodos([...todos, { id: uuid(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    let id = e.target.name;
    let i = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[i].isCompleted = !newTodos[i].isCompleted;
    setTodos(newTodos);
  };

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    setCurrentTime(formatDate());

    const interval = setInterval(() => {
      setCurrentTime(formatDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container bg-slightWhite mx-auto my-16 w-[80vw] h-[80vh] min-h-[80vh] min-w-[80vw] rounded-2xl text-black font-comfortaa">
        <div className="inputthing flex justify-center py-3">
          <input
            onChange={(e) => {
              handleTodoChange(e);
            }}
            value={todo}
            type="text"
            name=""
            className="rounded-l-xl p-1 w-[25rem] font-bold bg-risdBlue text-white"
            placeholder="Add a task..."
          />
          <button
            onClick={handleSave}
            disabled={todo.length <= 3}
            className="addbtn rounded-r-xl p-2 bg-white text-black font-bold cursor-pointer transition-shadow duration-300 disabled:cursor-not-allowed disabled:opacity-[0.6]"
          >
            I Got This!
          </button>
        </div>
        <div className="others flex flex-col gap-10 items-center">
          <p className="text-lg font-bold">{currentTime}</p>
          <div className="todos">
            {todos.map((item) => {
              return (
                <div key={item.id} className="todo flex gap-5 py-2">
                  <input
                    onChange={handleChange}
                    checked={item.isCompleted}
                    type="checkbox"
                    name={item.id}
                    id=""
                  />
                  <p
                    className={`todotext bg-risdBlue text-white font-bold rounded-xl p-2 ${
                      item.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {item.todo}
                  </p>
                  <div className="buttons flex gap-3 align-middle">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="editbtn bg-white rounded-3xl p-1 transition-shadow duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#000000"}
                        fill={"none"}
                      >
                        <path
                          d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 4L20 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 22L22 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="delbtn bg-white rounded-3xl p-1 transition-shadow duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        color={"#000000"}
                        fill={"none"}
                      >
                        <path
                          d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.5 16.5L9.5 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.5 16.5L14.5 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
