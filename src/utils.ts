import { Stream } from 'stream';

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

interface Variable {
  index: number;
  name: string;
}

export const getVariables = (url: string, route: string) => {
  const variables = route
    .split('/')
    .filter((i) => !!i)
    .reduce((acc: Variable[], name: string, index: number) => {
      if (!name || name[0] !== ':') return acc;
      return [...acc, { index, name: name.slice(1) }];
    }, []);

  const splittedUrl = url.split('/').filter((i) => !!i);

  const result = splittedUrl.reduce((acc: Record<string, string>[], name, index) => {
    const variable = variables.find((item) => item.index === index);
    if (variable) return [...acc, { value: name, name: variable.name }];
    return acc;
  }, []);

  return result;
};

export const getBody = async (stream: Stream): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';

    stream.on('data', (chunk) => {
      body += chunk;
    });

    stream.on('end', () => {
      if (!!body.length) {
        resolve(JSON.parse(body));
      }
      resolve({});
    });

    stream.on('error', reject);
  });
};
