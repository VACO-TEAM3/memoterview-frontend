export async function login({ email, imageUrl, name }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/login`, { 
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      imageUrl,
      name,
    }),
  });

  const { result, data: { token, user } } = await response.json();

  return { user, token, result };
}
