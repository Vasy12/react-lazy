export const loadPage = url => fetch(url).then(response => response.text());
