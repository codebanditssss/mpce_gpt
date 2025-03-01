import OpenAI from 'openai';

// Get API key from environment variable
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Check if API key is defined
if (!apiKey) {
  console.error(
    'Missing OpenAI API key. Please check your .env file.'
  );
}

// Create OpenAI client
const openai = new OpenAI({
  apiKey: apiKey as string,
  dangerouslyAllowBrowser: true // Note: This is for frontend use only; in production, it's better to proxy through a backend
});

// Export default for convenience
export default openai;