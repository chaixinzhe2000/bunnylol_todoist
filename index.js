import express from "express"
import { TodoistApi } from "@doist/todoist-api-typescript"
import * as chrono from 'chrono-node';

export const app = express();
const api = new TodoistApi(process.env.TODO_API_TOKEN)

const capitalize = (s) => {
	return s && s[0].toUpperCase() + s.slice(1);
}

app.get("/", (req, res) => {

	res.send("Express on Vercel");
});

app.get("/add", async (req, res) => {
	const todoString = req.query.todo;
	let assignmentString, addResponse

	try {
		if (todoString.includes("@")) {
			const timeString = todoString.substring(todoString.indexOf("@") + 1)
			const dueDate = chrono.parseDate(timeString, { timezone: "EST" })
			assignmentString = todoString.substring(0, todoString.indexOf("@"))
			addResponse = await api.addTask({ content: capitalize(assignmentString), dueDatetime: dueDate })
		} else {
			assignmentString = todoString
			addResponse = await api.addTask({ content: capitalize(assignmentString) })
		}
		res.redirect(addResponse.url);
	} catch {
		res.send("Failed to add the todo item, please try again")
	}
});

app.listen(5001, () => {
	console.log("Running on port 5001.");
});