//popup script to interact with the user interface
document.addEventListener('DOMContentLoaded', function () {
  const predictButton = document.getElementById('predictButton');
  const inputText = document.getElementById('inputText');
  const predictionResult = document.getElementById('predictionResult');

  predictButton.addEventListener('click', async () => {
      const text = inputText.value.trim();
      if (text) {
          try {
              const response = await fetch('https://physh-detector.onrender.com/predict', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: `text=${encodeURIComponent(text)}`,
              });
              const data = await response.json();
              const prediction = data.prediction === 1 ? 'Phishing' : 'Legitimate';
              predictionResult.textContent = `Prediction: ${prediction}`;
          } catch (error) {
              console.error('Error fetching prediction:', error);
          }
      } else {
          predictionResult.textContent = 'Input text not provided.';
      }
  });
});
