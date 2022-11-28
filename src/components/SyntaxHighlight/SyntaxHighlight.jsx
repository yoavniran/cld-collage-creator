import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import nighOWl from "react-syntax-highlighter/dist/esm/styles/hljs/night-owl";
import { useIsDarkMode } from "../../state/selectors";

SyntaxHighlighter.registerLanguage("json", json);

const SyntaxHighlight = ({
	                         code,
	                         language,
	                         showLineNumbers = true,
	                         className,
	                         ...shProps
                         }) => {
	const isDarkMode = useIsDarkMode();
	const highlightStyle = isDarkMode ? nighOWl : docco;

	return (
		<SyntaxHighlighter
			className={className}
			language={language}
			style={highlightStyle}
			showLineNumbers={showLineNumbers}
			{...shProps}
		>
			{code}
		</SyntaxHighlighter>
	);
};

export default SyntaxHighlight;
