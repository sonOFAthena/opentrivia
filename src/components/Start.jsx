import { useRef } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { trivia_categories, trivia_difficulties } from "../data/Data";
import useSelect from "../hooks/useSelect";

const Start = ( {setUserName, setCategory, setDifficulty}) => {
  const [category, SelectCategory] = useSelect( "History" , trivia_categories, "Seleccionar categoria");
  const [difficulty, SelectDifficulty] = useSelect( "Medium" , trivia_difficulties, "Seleccionar dificultad");

  const inputRef = useRef();

  const handleSubmit = (e)=>{
    e.preventDefault();
    inputRef.current.value && setUserName(inputRef.current.value);
    setCategory(category);
    setDifficulty(difficulty);

    console.log(inputRef.current.value);
    console.log(category);
    console.log(difficulty);
  }

  return (
    <Form className="start"  onSubmit={handleSubmit}>
        <input placeholder="enter your name " className="startInput" ref={inputRef} />
        <Form.Group>
          <SelectCategory />
        </Form.Group>
        <Form.Group>
          <SelectDifficulty />
        </Form.Group>
          <button className="startButton">Start</button>
    </Form>
  )
}

export default Start