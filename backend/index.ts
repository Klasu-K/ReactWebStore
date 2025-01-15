import {PORT} from "./src/utils/config";
import {app} from "./app"
import coloredConsole from "./src/utils/coloredConsole";

app.listen(PORT, () => {
  coloredConsole.log(`server running on port ${PORT}`, coloredConsole.TextColor.Green)
})