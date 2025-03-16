// /users/:id
export function buildRoutPath(path){

    const routeParametersRegex = /:([a-zA-Z]+)/g   //g = global
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<id>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex;
   
}
// tem uns games no google para aprender regex