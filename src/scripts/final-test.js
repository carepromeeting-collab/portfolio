const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyD4E1X7kk1JdBj7c9xooMf_Fk8cKw946uU",
  );
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("SUCCESS:", (await result.response).text());
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}

test();
