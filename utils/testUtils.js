export function getRandomCredentials() {
  const timestamp = Date.now();
  return {
    userName: `user_${timestamp}`,
    password: "Jennie321!",
  };
}
