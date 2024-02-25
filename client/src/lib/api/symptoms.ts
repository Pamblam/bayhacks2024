import axios from "axios";

interface ApiResponse {
  // Define the structure of the response data
  // You need to adjust this based on the actual response from your API
  // For this example, I'm assuming a simple object structure
  data: any;
}

export const getSymptoms = async (inputValue: string) => {
  return axios
    .get(
      `https://medicheck.pro/api/?action=search_symptoms&symptom=` +
        `${inputValue}`
    )
    .then((res) => res.data.response.slice(0, 10))
    .catch((err) => console.log(err));
};

export const getMatchingSymptoms = async (matchingSymptom: string) => {
  console.log(matchingSymptom)
  return axios
  .get(
    `https://www.medicheck.pro/api/?action=symptom_match&ids=` +
      `${matchingSymptom}`
  )
  .then((res) => res.data.response)
  .catch((err) => err);
}


