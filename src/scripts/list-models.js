const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyD4E1X7kk1JdBj7c9xooMf_Fk8cKw946uU",
  );
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Try Pro as fallback
    const result = await model.generateContent("Hi");
    console.log("PRO SUCCESS:", (await result.response).text());
  } catch (e) {
    console.log("PRO FAILURE:", e.message);
  }
}

listModels();
