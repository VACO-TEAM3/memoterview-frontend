import { authFetch } from "../utils/authFetch";

export async function login({ email, imageUrl, name }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/login`, {
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
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/speech-to-text/credentials`);

  return await response.json();
}

export async function getMyProjectsAPI({ userId, token }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/interviewers/${userId}/my_projects`, {
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
    `${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/interviewers/${userId}/joined_projects`, {
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
    `${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/projects/${projectId}`, {
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
  console.log(newProject, userId, "????");

  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/projects`, {
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

// 우선 질문기준, 이후 답변기준, interviwee || interviewer 이름 기준 advanced
export async function searchQuestions({ projectId, inputText, token }) {
  console.log(projectId, inputText, token, "ready?");

  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/projects/${projectId}/search?question=${inputText}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });
  const { result, data } = await response.json();
  console.log(result, "datdata");

  return data;
}

export async function searchInterviewers({ email, token }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/interviewers/search?email=${email}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function getIntervieweesAPI({ projectId, token }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/projects/${projectId}/interviewees`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  const { data } = await response.json();

  return data;
}

export async function getIntervieweeApi({ projectId, intervieweeId, token }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/projects/${projectId}/interviewees/${intervieweeId}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  });

  const { data, result } = await response.json();
  console.log(data, "data???");

  return data;
}

export async function updateInterviewRoomState({ token, projectId, intervieweeId, isRoomOpened }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/api/projects/${projectId}/interviewees/${intervieweeId}/updateInterviewRoom`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ isRoomOpened }),
  });

  const { data, result } = await response.json();

  return data;
}

export async function updateInterviewee({ token, interviewee, projectId, intervieweeId }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT_DEVELOPMENT}/api/projects/${projectId}/interviewees/${intervieweeId}`,
    {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ interviewee, intervieweeId, projectId }),
    }
  );

  const { data, result } = await response.json();

  return data;
}

export async function createIntervieweeAPI({ pdf, intervieweeInfo, token, projectId }) {
  const { name, email } = intervieweeInfo;

  console.log(projectId, "proejctid");
  const formData = new FormData();
  formData.append("pdf", pdf);
  formData.append("name", name);
  formData.append("email", email);

  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT}/api/projects/${projectId}/interviewees`, {
      method: "POST",
      body: formData,
      headers: {
        "authorization": `Bearer ${token}`,
      },
    }
  );

  const { data, result } = await response.json();

  return data;
}

export async function updateIntervieweeAnswer({ intervieweeId, question, token }) {
  const response = await fetch(`${process.env.REACT_APP_SERVER_PORT_LOCAL}/api/interviewees/${intervieweeId}/answer`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ question, intervieweeId }),
  });

  const { data, result } = await response.json();

  return data;
};

export async function requestSendEmailToInterviewee({ token, projectId, intervieweeId, intervieweeEmail, welcomePageLink }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT}/api/projects/${projectId}/interviewees/${intervieweeId}/invite`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        userEmail: intervieweeEmail,
        welcomePageLink: welcomePageLink,
      }),
    }
  );

  return await response.json();
}

export async function deleteIntervieweeAPI({ token, projectId, intervieweeId }) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_PORT}/api/projects/${projectId}/interviewees/${intervieweeId}`, {
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
}
