// src/app/api/services/chatService.js

export async function handleMessage(message) {
  // Aquí eventualmente irá la lógica de la IA para generar una respuesta.
  // Por ahora, simplemente devolvemos un eco del mensaje recibido.
  return { reply: `You said: ${message}` };
}
