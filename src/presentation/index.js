import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "./reveal.css";
import "./theme.css";
import "./style.scss";

let deck = new Reveal({
	plugins: [Markdown],
});
deck.initialize();
