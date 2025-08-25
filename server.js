require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

// Conecta com a API do Twilio usando as credenciais do .env
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Rota para envio de mensagem via WhatsApp com template
app.post('/enviar', (req, res) => {
  const { numero, variaveis } = req.body;

  client.messages
    .create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,       // Número do Twilio (Sandbox)
      to: `whatsapp:${numero}`,                       // Número do cliente
      contentSid: process.env.TWILIO_TEMPLATE_SID,    // ID do template aprovado
      contentVariables: JSON.stringify(variaveis)     // Variáveis do template
    })
    .then(msg => res.send(`✅ Mensagem enviada! SID: ${msg.sid}`))
    .catch(err => {
      console.error("❌ Erro ao enviar:", err);
      res.status(500).send("Erro ao enviar mensagem.");
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));