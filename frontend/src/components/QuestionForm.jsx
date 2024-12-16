import { useState } from "react";

function QuestionForm({ onSaveQuestion }) {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [optionInput, setOptionInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [type, setType] = useState("multiple-choice"); 

  function handleAddOption(){
    if(optionInput.trim()){
      setOptions((prevOptions) => [...prevOptions, optionInput]);
      setOptionInput(""); 
    }
  }

  async function handleSaveQuestion(){
    if(questionText && correctAnswer){
      const newQuestion = {
        questionText,
        type,
        correctAnswer,
        options: type === "multiple-choice" ? options : [],
      };

      await onSaveQuestion(newQuestion);
      setQuestionText("");
      setOptions([]);
      setCorrectAnswer("");
    } 
    
    else 
      alert("Please complete all fields before saving.");
    
  }

  return (

    <div className="border-black border-solid border-2 flex flex-col justify-center items-center w-600 h-600 m-auto mt-7 rounded-xl bg-stone-300">
      
      <h2 className="text-center text-4xl">Create Question</h2>
      
      <br />
      
      <label className="text-2xl">
        Question  
          <input className="bg-slate-500 text-white font-bold w-96 p-2 rounded-lg ml-8" type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
      </label>

      <br />

      {
        type === "multiple-choice" && (
          <>
            <label className="text-2xl">
              <button className="bg-sky-500 p-2 rounded-md hover:bg-sky-700 font-bold text-white" onClick={handleAddOption}>Add Option </button>
              <input className="bg-slate-500 text-white font-bold w-96 p-2 rounded-lg ml-2" type="text" value={optionInput} onChange={(e) => setOptionInput(e.target.value)} />
            </label>
            <br />
            <div>
              <h4 className="text-2xl">Options</h4>
              <br />
              {options.map((option, index) => (
                <div className="text-2xl mb-1" key={index}>
                  <input className="bg-slate-500 text-black" type="radio" name="correctAnswer" value={option} onChange={(e) => setCorrectAnswer(e.target.value)} />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          </>
      )}

      {
        type === "fill-in-the-blank" && (
          <>
            <label className="bg-sky-500 p-2 text-2xl rounded-md font-bold text-white">
              Correct Answer
              <input className="bg-slate-300 w-96 text-black p-2 rounded-lg ml-2" type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
            </label>
          </>
      )}

      <br />
      <br />

      <div className="text-center">
      <button className="text-xl bg-green-500 font-bold hover:bg-green-700 text-white p-3 rounded-xl" onClick={handleSaveQuestion}>Save Question</button>
      <br />
      <br />
        <label className="text-xl">
          Question Type
          <select className="bg-blue-400 p-3 rounded-xl text-lg ml-3 font-medium" onChange={(e) => setType(e.target.value)} value={type}>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="fill-in-the-blank">Fill in the Blank</option>
          </select>
        </label>
      </div>
    </div>

  );
}

export default QuestionForm;