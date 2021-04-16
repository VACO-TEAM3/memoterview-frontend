export function loginAPI({ email, imageURL, name }) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        "email": "asdf@asdf.com",
        "avatar": "asdfsdfsfsf.png",
        "username": "hama",
        "myProjects": [],
        "joinedProjects": [],
        "token": "aekjralek12345",
      });
    }, 1000);
  });
}
