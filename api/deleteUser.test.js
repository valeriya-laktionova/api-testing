import { test, expect } from "@playwright/test";

const username = `testuser_${Date.now()}`;
const password = "Bts7777!";

let userID;
let token;

test("Delete User - valid UUID", async ({ request }) => {
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

  const response = await request.delete(`/Account/v1/User/${userID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  expect(response.status()).toBe(204);
});

test("Delete User - nonexistent UUID", async ({ request }) => {
  const response = await request.delete(
    "/Account/v1/User/00000000-0000-0000-0000-000000000000"
  );
  expect(response.status()).toBe(401);
});
