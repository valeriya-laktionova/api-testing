import { test, expect, request } from "@playwright/test";
import { getRandomCredentials } from "../utils/testUtils";

const BASE_URL = "https://demoqa.com";

let userData;

test("Create User - valid data", async ({ request }) => {
  userData = getRandomCredentials();
  const res = await request.post(`${BASE_URL}/Account/v1/User`, {
    data: userData,
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(res.status()).toBe(201);
  const resBody = await res.json();
  expect(resBody).toHaveProperty("userID");
});

test("Create User - empty password", async ({ request }) => {
  const res = await request.post(`${BASE_URL}/Account/v1/User`, {
    data: { userName: "testUser", password: "" },
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(res.status()).toBe(400);
});
