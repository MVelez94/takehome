const GITHUB_SEARCH_ENDPOINT = "https://api.github.com/search/issues";
const GITHUB_ISSUE_ENDPOINT = "https://api.github.com/repos/facebook/react/issues";

function fetchEndpoint(endpoint, queryParams = null) {
    let params = "";
    let querySeparator = "";
    if(queryParams) {
        params = new URLSearchParams(queryParams);
        querySeparator = "?";
    }
    return fetch(endpoint.concat(querySeparator).concat(params.toString()));
}

function fetchIssuesByTitle(title) {
    return fetchEndpoint(GITHUB_SEARCH_ENDPOINT, {q: title + " in:title repo:facebook/react"})
}

function fetchIssueByNumber(number) {
    return fetchEndpoint(GITHUB_ISSUE_ENDPOINT + "/" + number);
}

export default {fetchIssueByNumber, fetchIssuesByTitle};
