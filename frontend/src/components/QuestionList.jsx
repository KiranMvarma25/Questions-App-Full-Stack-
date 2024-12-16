function QuestionList({ questions, onAnswer }){
  
  return (

    <div>
      <h2 className="text-center text-4xl">Questions</h2>
      <br />
      {
        questions.map((question, index) => (
          <div key={index}>
            <h3 className="text-2xl">{question.questionText}</h3>
              {
                question.type === "multiple-choice" ? (
                  question.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <input type="radio" name={`question-${index}`} value={option} onChange={(e) => onAnswer(index, e.target.value === question.correctAnswer) }/>
                      <label className="text-xl">{option}</label>
                    </div>
                  ))

                ) : (
                
                  <div>
                    <input className="bg-white text-black font-bold p-2 rounded-lg" type="text" placeholder="Enter your answer" onBlur={(e) => onAnswer(index, e.target.value.toLowerCase() === question.correctAnswer.toLowerCase())}/>
                  </div>
                  
                )
              }
              <br />
              <br />
          </div>
        ))
      }
      <br />
    </div>

  );
}

export default QuestionList;