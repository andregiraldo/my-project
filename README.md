# Restoration Backend

Backend para generar explicaciones personalizadas de costos de restauración usando OpenAI.

## Configuración

### 1. Variables de Entorno

En Netlify, configura la siguiente variable de entorno:
- `OPENAI_API_KEY`: Tu clave API de OpenAI

### 2. Despliegue en Netlify

1. Conecta este repositorio a Netlify
2. Netlify detectará automáticamente las funciones en la carpeta `netlify/functions/`
3. Configura la variable de entorno `OPENAI_API_KEY` en la configuración del sitio
4. Despliega el sitio

### 3. URL de la función

Una vez desplegado, tu función estará disponible en:
```
https://tu-sitio.netlify.app/.netlify/functions/generar-explicacion
```

## Uso

### Endpoint: POST /.netlify/functions/generar-explicacion

Envía datos en formato JSON:

```json
{
  "tipoDanio": "inundación",
  "area": 50,
  "urgencia": "alta",
  "costoEstimado": 5000,
  "tiempoEstimadoDias": 7
}
```

### Respuesta

```json
{
  "textoExplicacion": "Explicación generada por OpenAI..."
}
```

## Desarrollo Local

Para probar localmente con Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

Asegúrate de tener un archivo `.env` con tu `OPENAI_API_KEY`.
