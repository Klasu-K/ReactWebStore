import {PORT} from "./src/utils/config";
import {app} from "./app"

app.listen(PORT, () => {
  console.log(`\x1b[32m server running on port ${PORT}\x1b[0m`)
})