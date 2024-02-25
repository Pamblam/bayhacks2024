import React, { useState, useEffect } from "react";
import { getMatchingSymptoms } from "../lib/api/symptoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../../src/components/ui/card";
import { Button } from "../components/ui/button";

interface SearchFormProps {
  symptomList: Symptom[]; // Include the symptomList prop
  setSymptomList: React.Dispatch<React.SetStateAction<Symptom[]>>;
}

interface MatchingSymptomsResponse {
  message: string;
  response: {
    count: number;
    result: Symptom[];
  };
}

interface Symptom {
  id: string;
  symptom: string;
}

const testHandler = async (id: string[]) => {
  let matchIds = id.join(",");
  let matchingSymptomsList = await getMatchingSymptoms(matchIds);
  console.log(matchingSymptomsList);
};

export default function SymptomsForm({
  symptomList,
  setSymptomList,
}: SearchFormProps) {
  const [loading, setLoading] = useState(false);
  const [matchingSymptoms, setMatchingSymptoms] = useState<Symptom[] | null>(null);
  const [symptomsId, setSymptomsId] = useState<string[]>([]);

  useEffect(() => {
    if (symptomList) {
      setSymptomsId([...symptomsId, symptomList[0].id]);
    }
  }, [symptomList]);

  useEffect(() => {
    const fetchData = async () => {
      if (symptomList) {
        try {
          // Fetch the matching symptoms for the latest added symptom
          const symptoms = await getMatchingSymptoms(symptomList[0].id);
          console.log(symptoms.result);
          setMatchingSymptoms(symptoms.result);
        } catch (error) {
          console.error("Error fetching matching symptoms:", error);
        }
      }
    };
  
    fetchData();
  }, [symptomList]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <span>Are there any other symptoms you're experiencing ?</span>
        </CardHeader>
        <CardContent>
          {matchingSymptoms ? (
            matchingSymptoms.map((symptom) => (
              <li
              className="border-b py-3 hover:bg-slate-100 list-none"
              key={symptom.id +'-'+ symptom.symptom}
            >
              <button className="h-full w-full text-left" >
                <span className="p-4">{symptom.symptom}</span>
              </button>
            </li>
            ))
          ) : (
            <div>No matching symptoms found</div>
          )}
        </CardContent>
        <Button onClick={() => testHandler(symptomsId)}></Button>
      </Card>
    </div>
  );
}
