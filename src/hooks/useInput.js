import { useState } from "react";

export default function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  //   function onInputChange(event) {
  //     const { target: { value } } = event;

  //     setValue(value);
  //   }

  function onInputChange(event) {
    event.preventDefault();

    const { target: { value, name } } = event;
    const inputName = name;
    const inputValue = value;

    setValue({
      ...inputName,
      [inputName]: inputValue,
    });

    console.log(value, "vale");
  }


  return { value, onInputChange };
}
