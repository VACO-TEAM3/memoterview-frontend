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

export function getMyProjectsAPI(userId) {
  console.log("getMyProjectsAPI", userId);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          "id": "sfsdfdsfafewf",
          "title": "Frontend 주니어 채용",
          "candidateNum": 30,
          "createAt": "2021-04-10",
        },
        {
          "id": "fdfsdfdsfsdf",
          "title": "Backend 주니어 채용",
          "candidateNum": 14,
          "createAt": "2021-04-10",
        }
      ]);
    }, 1000);
  });
};

export function getJoinedProjectsAPI(userId) {
  console.log("getJoinedProjectsAPI", userId);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          "id": "123412341234",
          "title": "Frontend 주니어 채용99",
          "candidateNum": 999,
          "createAt": "2021-04-13",
        },
        {
          "id": "5456547657657567",
          "title": "Backend 주니어 채용99",
          "candidateNum": 99,
          "createAt": "2021-04-13",
        }
      ]);
    }, 1000);
  });
};
