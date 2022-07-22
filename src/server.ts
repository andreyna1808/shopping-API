import { app } from './index';

app.listen(process.env.PORT || 3333, () => {
  console.log('Server running http://localhost:3333');
});
