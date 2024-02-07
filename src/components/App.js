import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((data) => setQuestions(data))
  }, []);

  function handleSubmit(formData) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
        correctIndex: parseInt(formData.correctIndex),
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions([...questions, data]);
      })
  }
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((resp) => {
      if (resp.ok) {
        setQuestions(questions.filter((question) => question.id !== id));
      } else {
        console.error("Error deleting question");
      }
    })
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onSubmit={handleSubmit}/> : <QuestionList questions={questions} onDelete={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
