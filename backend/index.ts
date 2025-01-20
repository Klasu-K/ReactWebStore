import {PORT} from "./src/utils/config.js";
import {app} from "./app.js"
import coloredConsole from "./src/utils/coloredConsole.js";

app.listen(PORT, () => {
  coloredConsole.log(`server running on port ${PORT}`, coloredConsole.TextColor.Green)
})