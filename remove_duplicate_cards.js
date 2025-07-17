require("dotenv").config();

const API_KEY = process.env.TRELLO_API_KEY;
const TOKEN = process.env.TRELLO_TOKEN;
const BOARD_ID = process.env.TRELLO_BOARD_ID;
const baseURL = "https://api.trello.com/1";

// Fetch all lists with cards
async function getLists() {
  const res = await fetch(
    `${baseURL}/boards/${BOARD_ID}/lists?cards=all&card_fields=name&key=${API_KEY}&token=${TOKEN}`
  );
  return res.json();
}

// Delete a card by ID
async function deleteCard(cardId) {
  await fetch(`${baseURL}/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`, {
    method: "DELETE",
  });
}

// Archive a list (since Trello doesn't allow deleting lists via API)
async function archiveList(listId) {
  await fetch(
    `${baseURL}/lists/${listId}/closed?key=${API_KEY}&token=${TOKEN}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: true }),
    }
  );
}

async function run() {
  const lists = await getLists();
  const listMap = new Map();
  const cardMap = new Map();

  for (const list of lists) {
    const listKey = list.name.trim().toLowerCase();

    if (listMap.has(listKey)) {
      console.log(`🗂️ Archiving duplicate list: ${list.name}`);
      await archiveList(list.id);
    } else {
      listMap.set(listKey, list.id);
    }

    // Handle duplicate cards in each list
    for (const card of list.cards) {
      const cardKey = card.name.trim().toLowerCase();
      if (cardMap.has(cardKey)) {
        console.log(`🗑️ Deleting duplicate card: ${card.name}`);
        await deleteCard(card.id);
      } else {
        cardMap.set(cardKey, card.id);
      }
    }
  }

  console.log("✅ Duplicate lists archived & duplicate cards removed!");
}

run().catch(console.error);
