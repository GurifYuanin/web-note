const path = {
  CWDS: (function () {
    const { pathname } = window.location;
    return pathname.substring(0, pathname.lastIndexOf('/')).split('/').filter(Boolean);
  })(),
  resolve(...paths) {
    const root = '/';
    if (paths.length === 0) {
      return root;
    }
    const directories = [];
    const results = paths[0].startsWith('/') ? [] : path.CWDS.map(cwd => cwd);
    for (let i = 0; i < paths.length; i++) {
      if (!paths[i]) continue;
      if (paths[i].includes('/')) {
        directories.push(...paths[i].split('/').filter(Boolean))
      } else {
        directories.push(paths[i]);
      }
    }
    for (let i = 0; i < directories.length; i++) {
      const directory = directories[i];
      switch (directory) {
        case '.': break;
        case '..': {
          if (results.length === 0) {
            throw new Error('无法往根路径上一级');
          } else {
            results.pop();
          }
          break;
        };
        default: {
          results.push(directory);
        }
      }
    }
    return root + results.join('/');
  }
}