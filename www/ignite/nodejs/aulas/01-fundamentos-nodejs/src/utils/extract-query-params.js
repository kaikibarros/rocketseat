export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((querParams, param) => {
        const [key, value] = param.split('=')

        queryParams[key] = value

        return queryParams
    }, {})

}