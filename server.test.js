const { test } = require("node:test");
const assert = require("node:assert");
const server = require("./server");

test("server returns a successful JSON response", async () => {
  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}`);

    assert.strictEqual(response.status, 200);
    assert.match(response.headers.get("content-type"), /application\/json/);

    const body = await response.json();

    assert.strictEqual(body.message, "Hello from my Node.js server!");
    assert.strictEqual(body.status, "success");
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
