import React, { useState, useEffect } from "react";
import "./sanitize.css";
import "./App.css";
import { ChatContainer } from "./components/ChatContainer.jsx";

function App() {
	const [test, setTest] = useState("test");

	useEffect(() => {
		async function getTest() {
			let response = await fetch("/test").then((res) => res.json());
			console.log(response);
		}
		getTest();
	}, []);

	return (
		<div>
			<ChatContainer />
			<div>{test}</div>
		</div>
	);
}

export default App;
