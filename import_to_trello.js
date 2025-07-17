require("dotenv").config();
const fs = require("fs");

const API_KEY = process.env.TRELLO_API_KEY;
const TOKEN = process.env.TRELLO_TOKEN;
const BOARD_ID = process.env.TRELLO_BOARD_ID;

const baseURL = "https://api.trello.com/1";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function run() {
  const board = JSON.parse(
    fs.readFileSync("./third_faang_frontend_full_workflow.json", "utf8")
  );

  for (const list of board.lists) {
    const listRes = await fetch(
      `${baseURL}/lists?name=${encodeURIComponent(
        list.name
      )}&idBoard=${BOARD_ID}&key=${API_KEY}&token=${TOKEN}`,
      {
        method: "POST",
      }
    );
    const contentType = listRes.headers.get("content-type") || "";

    const listData = contentType.includes("application/json")
      ? await listRes.json()
      : await listRes.text();

    if (!listRes.ok) {
      console.error("❌ Failed to create list:", list.name);
      console.error("Response:", listData);
      return;
    }

    const listId = listData.id;

    for (const card of list.cards) {
      const cardRes = await fetch(
        `${baseURL}/cards?name=${encodeURIComponent(
          card.name
        )}&idList=${listId}&key=${API_KEY}&token=${TOKEN}`,
        {
          method: "POST",
        }
      );
      const cardData = await cardRes.json();
      const cardId = cardData.id;

      if (card.checklist?.length > 0) {
        const checklistRes = await fetch(
          `${baseURL}/checklists?idCard=${cardId}&name=Checklist&key=${API_KEY}&token=${TOKEN}`,
          {
            method: "POST",
          }
        );
        const checklistData = await checklistRes.json();
        const checklistId = checklistData.id;

        for (const item of card.checklist) {
          await fetch(
            `${baseURL}/checklists/${checklistId}/checkItems?name=${encodeURIComponent(
              item
            )}&key=${API_KEY}&token=${TOKEN}`,
            {
              method: "POST",
            }
          );
          await delay(200);
        }
      }

      await delay(500);
    }
  }

  console.log("✅ Trello board populated using fetch and .env!");
}

run().catch(console.error);
