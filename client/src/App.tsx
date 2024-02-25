import React, { useState, useEffect } from "react";
import SearchForm from "./forms/SearchForm";
import SymptomsForm from "./forms/SymptomsForm";

type Symptom = {
  id: string;
  symptom: string;
};

function App() {
  const [nextForm, setNextForm] = useState(false);
  const [symptomList, setSymptomList] = useState<Symptom[]>([]);

  useEffect(() =>{
    console.log(symptomList)
  }, [symptomList])

  return (
    <div>
      {nextForm ? (
        <SymptomsForm symptomList={symptomList} setSymptomList={setSymptomList}/>
      ) : (
        <SearchForm nextForm={nextForm} setNextForm={setNextForm} symptomList={symptomList} setSymptomList={setSymptomList}/>
      )}
    </div>
  );
}

export default App;
