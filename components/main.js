import * as views from "../views";
import html from "html-literal";

export default state =>
  html`
    ${views[state.view](state)}
  `;
