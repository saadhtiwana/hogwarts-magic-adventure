import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    axios.get("https://hp-api.onrender.com/api/characters")
        .then(charactersResponse => {
            const characters = charactersResponse.data.slice(0, 10);
            axios.get("https://hp-api.onrender.com/api/spells")
                .then(spellsResponse => {
                    const spells = spellsResponse.data.slice(0, 10);
                    res.render("index", { characters: characters, spells: spells });
                })
                .catch(error => {
                    console.log("Spells error:", error.message);
                    res.status(500).send("Oops! Spells didn’t load!");
                });
        })
        .catch(error => {
            console.log("Characters error:", error.message);
            res.status(500).send("Oops! Characters didn’t load!");
        });
});

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});
