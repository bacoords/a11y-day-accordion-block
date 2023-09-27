import Reveal from "reveal.js";
// import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";
import "./reveal.css";
import "./theme.css";
import "./style.scss";

let deck = new Reveal({
	plugins: [Notes],
});
deck.initialize({
	autoAnimate: false,
	slideNumber: true
});
