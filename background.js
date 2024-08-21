//background script to handle phishing checks
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === 'checkPhishing') {
        const text = message.text.trim();
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
                sendResponse({ result: prediction });
            } catch (error) {
                console.error('Error fetching prediction:', error);
                sendResponse({ error: 'Prediction failed' });
            }
        } else {
            sendResponse({ error: 'Input text not provided.' });
        }
    }
});
