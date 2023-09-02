import { handleMessage } from './services/chatService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await handleMessage(message);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
