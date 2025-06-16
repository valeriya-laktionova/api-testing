import { test, expect } from "@playwright/test";

const username = `testuser_${Date.now()}`;
const password = "Jennie123!";

let userID;
let token;

test("Get User - valid UUID", async ({ request }) => {
  const createUser = await request.post("/Account/v1/User", {
    data: { userName: username, password },
  });
  const userBody = await createUser.json();
  userID = userBody.userID;

  const tokenRes = await request.post("/Account/v1/GenerateToken", {
    data: { userName: username, password },
  });
  const tokenBody = await tokenRes.json();
  token = tokenBody.token;

  const response = await request.get(`/Account/v1/User/${userID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.username).toBe(username);
});

test("Get User - invalid UUID", async ({ request }) => {
  const response = await request.get("/Account/v1/User/invalid-id");
  expect(response.status()).toBe(401);
});
