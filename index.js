import express from "express"
import { TodoistApi } from "@doist/todoist-api-typescript"

export const app = express();
const api = new TodoistApi(process.env.TODO_API_TOKEN)

app.get("/", (req, res) => {
	res.send("Express on Vercel");
});

app.get("/add", async (req, res) => {
	try {
		const addResponse = await api.addTask({ content: req.query.todo })
		res.redirect(addResponse.url);
	} catch {
		res.send("Failed to add the todo item, please try again")
	}
});

app.listen(5001, () => {
	console.log("Running on port 5001.");
});