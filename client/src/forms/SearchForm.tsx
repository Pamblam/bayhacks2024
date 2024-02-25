import React, { useState, useEffect } from "react";

import { Input } from "../../src/components/ui/input";
import { getSymptoms } from "../lib/api/symptoms";
import { ScrollArea } from "../../src/components/ui/scroll-area";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button"; 

interface SearchFormProps {
  nextForm: boolean;
  setNextForm: React.Dispatch<React.SetStateAction<boolean>>;
  symptomList: Symptom[]; // Include the symptomList prop
  setSymptomList: React.Dispatch<React.SetStateAction<Symptom[]>>;
}

interface Symptom {
  id: string;
  symptom: string;
}


export default function SearchForm({ nextForm, setNextForm, symptomList, setSymptomList }: SearchFormProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchSymptom, setSearchSymptom] = useState<string[] | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [autoComplete, setAutoComplete] = useState(false)



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Activate autocomplete feature
    setAutoComplete(true)

    setInputValue(event.target.value);
    if (event.target.value.trim() === "") {
      setSearchSymptom(null); // Reset searchSymptom when input is empty
    }
  };

  const handleSelectSymptom = (symptom: string) => {
    setAutoComplete(false)
    setInputValue(symptom[1])

    setSelectedSymptom(symptom);
    setSearchSymptom(null); // Clear search results
  };

  const handleSymptomSubmit = () => {
    if (selectedSymptom !== null) {
      // If selectedSymptom is not null, execute these actions
     
      
      const symptom: Symptom = { id: selectedSymptom[0], symptom: selectedSymptom[1] };
      setSymptomList(symptomList => [...symptomList, symptom]);
     console.log(symptomList)
    } else {
      
    }
    setNextForm(true);
  }

    // Calls getSymptoms Api when autoComplete is active and input value changes
  useEffect(() => {
    if (autoComplete && inputValue.trim() !== "") {
      const timer = setTimeout(async () => {
        setSearchSymptom(await getSymptoms(inputValue));
      }, 300);
      // Clear the timeout on component unmount or inputValue change
      return () => clearTimeout(timer);
    }
  }, [autoComplete, inputValue]);

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setInputValue("");
      setSearchSymptom(null); // Update inputValue to empty if input is empty
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="border w-[500px] m-auto p-5 shadow-lg">
        <CardHeader>
          Could you please tell me what symptoms you're currently experiencing?
        </CardHeader>
        <Input
          className="w-full relative"
          placeholder="Enter your symptom"
          onChange={handleChange}
          onBlur={handleBlur} // Add onBlur event handler
          value={inputValue} // Pass inputValue as value prop
        />
        {searchSymptom !== null && (
          <ScrollArea className="h-72 w-full mt-4 rounded z-30 absolute">
            <div className="py-4 border">
              <ul>
                {searchSymptom.map((symptom) => (
                  <li
                    className="border-b py-3 hover:bg-slate-100"
                    key={symptom[0]+'-'+symptom[1]}
                  >
                    <button className="h-full w-full text-left" onClick={() => handleSelectSymptom(symptom)}>
                      <span className="p-4">{symptom[1]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        )}
        <CardDescription>
          <span className="p-2"></span>
        </CardDescription>
        <CardFooter className="w-full flex justify-end p-0">
          <Button variant={selectedSymptom? 'default' :'disable'} size={'lg'} onClick={handleSymptomSubmit}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
