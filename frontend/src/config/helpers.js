import { proxy } from './global';

// For /src/components/post (not in reducer in order to prevent component refresh)
export const helpProfileGetByUserId = async (userId) => {
  const url = proxy + `/api/profile/${userId}`;
  try {
    const res = await fetch(url);
    const resBody = await res.json();
    if (res.status === 200) return resBody;
    else return null;
  }
  catch (er) {
    return null;
  }
}