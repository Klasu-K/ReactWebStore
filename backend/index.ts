import {PORT} from "./utils/config";
import {app} from "./app"

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})