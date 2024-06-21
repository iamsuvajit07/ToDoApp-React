// import React from "react";

// const ToDoLists = (props) =>{
//     return (
//         <>
//         <div className="todo_style">
//             <i  
//                 className="fa fa-times" 
//                 aria-hidden="true"
//                 onClick={() => {
//                     props.onSelect(props.id);
//                 }}
//             />
//             <li> {props.text} </li>
//         </div>
//         </>
//     );
// };



// export default ToDoLists;



//ToDoList  using Material UI

import React from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import ListCom from "./ListCom";



const ToDoList = () =>{
    const [item, setItem] = useState("");
    const [newitem, setnewItem] = useState([]);

    const itemEvent = (event) =>{
        setItem(event.target.value);
    };

    const listOfItems = () =>{
        setnewItem((prevValue) =>{
            return [...prevValue, item]
        });
        setItem("");
    };

    return(
        <>
            <div className="main_div">
                <div className="center_div">
                    <br/>
                    <h1> ToDo List </h1>
                    <br/>
                    <input 
                    type="text"
                    value={item}
                    placeholder="Add an Item"
                    onChange={itemEvent}
                    />
                    <Button 
                    className="newBtn"
                    onClick={listOfItems}
                    >
                        <AddIcon />
                    </Button>

                    <br />
                    <ol>
                        {newitem.map((val) =>{
                            return <ListCom text={val}/>;
                        })}
                    </ol>
                    <br/>
                </div>
            </div>
        </>
    )
};


export default ToDoList;