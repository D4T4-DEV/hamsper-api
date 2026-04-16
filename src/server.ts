import app from "./app";
import { PORT } from "./core/env-container";

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
