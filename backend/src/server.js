const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'alfred-sdr-conectivida-backend' });
});

app.get('/api/message', (_req, res) => {
  res.json({ message: 'Backend Alfred SDR Conectivida funcionando na porta 3001.' });
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado em http://localhost:${PORT}`);
});
