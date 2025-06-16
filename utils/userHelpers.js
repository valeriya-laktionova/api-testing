export async function createUser(request, username, password) {
  const response = await request.post("/Account/v1/User", {
    data: { userName: username, password },
  });
  return response;
}
