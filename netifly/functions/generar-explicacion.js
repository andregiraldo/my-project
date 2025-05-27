import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Solo POST permitido" }),
    };
  }

  const data = JSON.parse(event.body);
  const { tipoDanio, area, urgencia, costoEstimado, tiempoEstimadoDias } = data;

  const prompt = `El cliente reportó daño por ${tipoDanio} en paredes de ${area} m2 con urgencia ${urgencia}. El costo estimado es $${costoEstimado} y tomará aproximadamente ${tiempoEstimadoDias} días. Explica esto en lenguaje sencillo para una persona sin conocimientos técnicos.`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const textoExplicacion = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ textoExplicacion }),
    };
  } catch (error) {
    console.error("Error en OpenAI:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al generar explicación" }),
    };
  }
}
