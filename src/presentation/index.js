import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "./style.scss";

let deck = new Reveal({
	plugins: [Markdown],
});
deck.initialize();
