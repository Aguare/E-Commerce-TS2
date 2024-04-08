import app from './app.js';
import './dbConnect.js';

app.listen(3000, () => {
  console.log('Server on port 3000');
});
