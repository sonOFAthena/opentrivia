import { useState } from "react"
import { Form } from "react-bootstrap";

const useSelect = (initialState , options, label) => {
  const [state, setState] = useState(options.find((data => data.name === initialState)).id);  
  
  const select = () => (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={options.find((data => data.id === state)).name} size="lg" onChange={(e) => setState(options.find((data => data.name === e.target.value)).id)}>
        {options.map((option) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </Form.Select>
    </>
  );

  return [state, select];
}

export default useSelect;