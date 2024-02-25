interface ApiResponse {
  // Define the structure of the response data
  // You need to adjust this based on the actual response from your API
  // For this example, I'm assuming a simple object structure
  data: any;
}

async function searchSymptoms(symptom: string): Promise<ApiResponse> {
  try {
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://45.55.44.140/api/?action=search_symptoms';
    const requestData = {
      symptom: symptom
    };

    const response = await fetch(corsAnywhereUrl + apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json();
    return responseData;
  } catch (error) {
    // Handle errors here
    console.error('Error occurred during API request:', error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const symptom = 'cough';
    const apiResponse = await searchSymptoms(symptom);
    console.log('API response:', apiResponse);
  } catch (error) {
    // Handle errors from the API function
    console.error('Error occurred during API request:', error);
  }
})();

  export { searchSymptoms }