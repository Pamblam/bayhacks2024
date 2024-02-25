import React, { useState, useEffect } from "react";
import { Input } from "../src/components/ui/input";
import axios from "axios";
import { ScrollArea } from "../src/components/ui/scroll-area";
import { Card, CardDescription, CardHeader } from "../src/components/ui/card";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchSymptom, setSearchSymptom] = useState<string[] | null>(null);

  const getSymptoms = async () => {
    return axios
      .get(
        `https://medicheck.pro/api/?action=search_symptoms&symptom=` +
          `${inputValue}`
      )
      .then((res) => setSearchSymptom(res.data.response.slice(0, 10)))
      .catch((err) => console.log(err));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value.trim() === "") {
      setSearchSymptom(null); // Reset searchSymptom when input is empty
    }
  };

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const timer = setTimeout(getSymptoms, 1000);

      // Clear the timeout on component unmount or inputValue change
      return () => clearTimeout(timer);
    }
  }, [inputValue]);

  useEffect(() => {
    console.log(searchSymptom);
  }, [searchSymptom]);

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      setInputValue("");
      setSearchSymptom(null); // Update inputValue to empty if input is empty
    }
  };

  return (
    <div className="App">
      <div className="flex justify-center items-center h-screen">
        <Card className="border w-[500px] m-auto p-5 shadow-lg">
          <CardHeader>
            Could you please tell me what symptoms you're currently
            experiencing?
          </CardHeader>
          <Input
            className="w-full relative"
            placeholder="Your Sympton"
            onChange={handleChange}
            onBlur={handleBlur} // Add onBlur event handler
            value={inputValue} // Pass inputValue as value prop
          />
          {searchSymptom !== null && (
            <ScrollArea className="h-72 w-full mt-4 rounded z-30 absolute">
              <div className="py-4 border">
                <ul>
                  {searchSymptom.map((symptom, index) => (
                    <li
                      className="border-b py-3 hover:bg-slate-100"
                      key={index}
                    >
                      <span className="p-4">{symptom[1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollArea>
          )}
          <CardDescription>
            <span className="p-2"></span>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}

export default App;
