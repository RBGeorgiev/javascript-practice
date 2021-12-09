import React, { useState, useEffect } from "react";
import "./sanitize.css";
import "./App.css";
import { ChatContainer } from "./components/ChatContainer.jsx";

function App() {
	const [test, setTest] = useState([]);

	useEffect(() => {
		async function getTest() {
			let response = await fetch("/test")
				.then((res) => res.json())
				.then((t) => setTest(t))
				.catch((err) => console.log(err));
			console.log(response);
		}
		getTest();
	}, []);

	return (
		<div>
			<ChatContainer />
			<div>
				{test.map((el) => (
					<p key={el.id}>
						{el.id}: {el.nickname}
					</p>
				))}
			</div>
		</div>
	);
}

export default App;
