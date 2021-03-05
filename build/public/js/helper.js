import { isNullOrUndefined } from "./pattern-validator";

const getLastPathFromUrl = (url) => {
  if (isNullOrUndefined(url)) {
    return;
  }
  const splittedUrl = url.split("/");
  const lastPath = splittedUrl[splittedUrl.length - 1];
  return lastPath;
};

const ok = (status) => {
  const okStatus = [200, 201, 204];
  const isMatched = okStatus.includes(status);
  console.log("is matched", isMatched);
  return isMatched;
};

export { getLastPathFromUrl, ok };
