import config from './config/config.js';
import app from './App.js';

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

