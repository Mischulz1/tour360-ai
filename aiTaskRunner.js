// aiTaskRunner.js
require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const API_KEY = process.env.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';

async function runTask(taskDescription) {
  const response = await axios.post(
    endpoint,
    {
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a developer maintaining a 360° virtual tour viewer for Squarespace. The viewer uses Three.js and must remain fully self-contained.' },
        { role: 'user', content: taskDescription }
      ],
      temperature: 0.3
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const code = response.data.choices[0].message.content;
  fs.writeFileSync('ai-output.txt', code);
  console.log('✅ AI task completed. Output saved to ai-output.txt');
}

// Replace this task with whatever you want the AI to do:
runTask("Fix marker visibility so that the white arrow is fully visible from any camera angle.");
