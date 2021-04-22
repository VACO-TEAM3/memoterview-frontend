import { authFetch } from "../utils/authFetch";

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

export async function getSpeechToTextToken() {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/speech-to-text/credentials`);

  return await response.json();
}

export async function getMyProjectsAPI({ userId, token }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT}/api/interviewers/${userId}/my_projects`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    }
  );

  const { data } = await response.json();

  return data;
}

export async function getJoinedProjectsAPI({ userId, token }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT}/api/interviewers/${userId}/joined_projects`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    }
  );

  const { data } = await response.json();

  return data;
}

export async function deleteProjectAPI({ projectId, token }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    }
  );

  const { data } = await response.json();

  return data._id;
};

export async function addMyProjectAPI({ userId, newProject, token }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/projects`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ ...newProject, creator: userId }),
  });

  const { data } = await response.json();

  return data;
}

export async function searchInterviewers({ email, token }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/interviewers/search?email=${email}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  return await response.json();
}
