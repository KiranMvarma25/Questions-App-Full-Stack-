import React, { useState, useEffect } from "react";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [viewQuestions, setViewQuestions] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {

      try{
        const response = await fetch("https://questions-app-backend-3.onrender.com/base/questions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setQuestions(data);
        localStorage.setItem("questions", JSON.stringify(data)); 
      } 

      catch(error){
        console.error("Error fetching questions:", error);
      }

    };

    
    const savedQuestions = localStorage.getItem("questions");
    if(savedQuestions){
      setQuestions(JSON.parse(savedQuestions));
    } 
    
    else{
      if(viewQuestions) 
        fetchQuestions();
    }
  }, [viewQuestions]);

  
  async function handleSaveQuestion(newQuestion) {

    try {
      const response = await fetch("https://questions-app-backend-3.onrender.com/base/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if(response.ok){
        const savedQuestion = await response.json();
        setQuestions((prevQuestions) => [...prevQuestions, savedQuestion.question]);
        localStorage.setItem("questions", JSON.stringify([...questions, savedQuestion.question])); 
      } 
      
      else
        alert("Error saving question.");
      
    } 
    
    catch(error){
      console.error("Error saving question:", error);
    }
  }

  function handleAnswer(questionIndex, isCorrect) {
    const updatedResults = [...results];
    updatedResults[questionIndex] = isCorrect;
    setResults(updatedResults);
  }

  return (

    <div>
      {
        viewQuestions ? (
          <>
          <div className="flex justify-evenly items-center flex-wrap">
            <div className="border-black border-solid border-2 w-600 h-600 overflow-scroll flex flex-wrap flex-col items-center mt-14 mb-14 rounded-lg bg-cyan-200">
              <QuestionList questions={questions} onAnswer={handleAnswer} />
            </div>
              
            <div className="border-black border-solid border-2 p-4 text-lg h-96 overflow-scroll rounded-lg bg-cyan-200">  
              <button className="bg-sky-500 p-2 rounded-md hover:bg-sky-700 font-bold text-white" onClick={() => setViewQuestions(false)}>Back</button>
              <br />
              <br />
              <div>
                <h3>Results</h3>
                {questions.map((q, index) => (
                  <p key={index} className="p-2">
                    {q.questionText} : {results[index] ? "Correct" : "Incorrect"}
                  </p>
                ))}
              </div>
            </div>
          </div>
          </>

        ) : (

          <>
            <QuestionForm onSaveQuestion={handleSaveQuestion} />
            <br />
            <button className="flex items-center justify-center text-white font-medium text-lg hover:bg-sky-900 m-auto bg-sky-700 p-2 rounded-md" onClick={() => {
                if(questions.length === 0){
                  alert("No questions available to view.");
                  return;
                }
                setViewQuestions(true);
              }}
            >
              View Questions
            </button>
          </>
        )

      }
    </div>

  );
}

export default App;