export {};
const injectScript = function (file: string, node: any) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.setAttribute("src", chrome.runtime.getURL(file));
  return th.appendChild(s);
};

injectScript("inject_script.js", "body");
