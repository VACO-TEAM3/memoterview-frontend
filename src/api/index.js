export async function login({ email, imageUrl, name }) {
  console.log(email, imageUrl, name);
  const request = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/login`, { 
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

  const { result, token } = request.json();

  return { result, token };
}
