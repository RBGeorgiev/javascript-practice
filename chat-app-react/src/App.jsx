import React, { Component } from "react";
import "./sanitize.css";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			test: [],
		};
	}

	componentDidMount() {
		fetch("/test")
			.then((res) => res.json())
			.then((test) =>
				this.setState({ test: test }, () => console.log("test working", test))
			)
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<div>
				<h1>Backend call test</h1>
				<div>
					{this.state.test.map((el) => (
						<p key={el.id}>
							{el.id}: {el.nickname}
						</p>
					))}
				</div>
			</div>
		);
	}
}

export default App;
