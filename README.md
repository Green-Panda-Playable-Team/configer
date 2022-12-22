# Configer

A graphical user interface builder for different input types

[See all the avaiable block types](https://docs.greenpandagames.com/web/playable/configer/global.html)

## How to use

```js
// setup config
var config = {
	name: {
		type: "text",
		title: "Your name",
		value: "Bob",
	},

	age: {
		type: "number",
		title: "Your age",
		value: 22,
	},

	skill: {
		type: "select",
		title: "Choose your skill",
		options: ["js", "java", "c++"],
		labels: ["Javascript", "Java", "C++"],
		value: "js",
	},

	car: {
		type: "checkbox",
		title: "Do you own a car?",
		value: false,
	},

	send: {
		type: "button",
		title: "SEND",
		onClick: function () {
			console.log("Send data");
		},
	},
};

// build user interface
var container = document.createElement("div");

document.body.appendChild(container);

var gui = new configer.GUI("new_user_form", {
	parent: container,
	config: config,
});

// get config values
var values = configer.parse(config);

console.log(values); // { name: "Bob", age: 22, skill: "js", car: false }
```
