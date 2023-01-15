// const checkUrl2 = (url: string, route: string) => {
//   const splittedUrl = url.split('/').filter((i) => !!i);
//   const splittedRoute = route.split('/').filter((i) => !!i);
//   if (splittedUrl.length !== splittedRoute.length) return false;
//   const result = splittedUrl.reduce((acc, item, i) => {
//     const routeItem = splittedRoute[i];
//     if (routeItem[0] === ':') return acc && true;
//     return acc && item === routeItem;
//   }, true);
//   return result;
// };

const checkUrl = (url: string, route: string) => {
  let regex = route.replace(/:([^/]+)/g, (_, cg) => `(?<${cg}>[/\\w%]+)`);
  regex = `^${regex}$`;
  const result = url.match(regex);
  return !!result;
};

export const getRoute = (url: string, routes: string[]) => {
  const route = routes.find((item) => checkUrl(url, item));
  return route;
};

export class AppError extends Error {
  isSkippable: boolean;

  constructor(message: string) {
    super(message);
    this.isSkippable = true;
  }
}
