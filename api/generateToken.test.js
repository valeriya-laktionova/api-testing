import { test, expect, request } from "@playwright/test";
import { createUser } from "../utils/userHelpers";

const BASE_URL = "https://demoqa.com/Account/v1";

test("should generate token for existing user", async ({ request }) => {
  const { username } = await createUser(request);

  const response = await request.post(`${BASE_URL}/GenerateToken`, {
    data: { userName: username, password: "" },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.message).toBe("UserName and Password required.");
});

test("should not generate token with wrong password", async ({ request }) => {
  const { username } = await createUser(request);

  const response = await request.post(`${BASE_URL}/GenerateToken`, {
    data: { userName: username, password: "WrongPass123!" },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.message).toBe("UserName and Password required.");
});
