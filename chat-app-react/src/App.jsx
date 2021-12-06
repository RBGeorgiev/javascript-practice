import React, { useState } from "react";
import "./sanitize.css";
import "./App.css";
import { ChatContainer } from "./components/ChatContainer.jsx";

function App() {
	const [test, setTest] = useState("test");
	return (
		<div>
			<ChatContainer />
			<div>{test}</div>
		</div>
	);
}

export default App;
