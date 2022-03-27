import jss from "jss";
import preset from "jss-preset-default";
import { styles } from "./styles";
jss.setup(preset());

export const { classes } = jss.createStyleSheet(styles).attach();
