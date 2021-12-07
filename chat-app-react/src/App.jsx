import React, { useState, useEffect } from "react";
import "./sanitize.css";
import "./App.css";
import { ChatContainer } from "./components/ChatContainer.jsx";

function App() {
	const [test, setTest] = useState("test");

	useEffect(() => {}, []);

	return (
		<div>
			<ChatContainer />
			<div>{test}</div>
		</div>
	);
}

export default App;
