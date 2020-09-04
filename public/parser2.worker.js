self.onmessage = event => {
  const {
    data: [url, regexp],
  } = event;

  const state = {
    error: null,
    isFetching: true,
    results: [],
  };

  self.postMessage(state);

  fetch(url)
    .then(response => response.text())
    .then(html => {
      const results = html.matchAll(regexp);

      for (const match of results) {
        const result = {
          ...match.groups,
        };
        delete result.quote;
        state.results.push(result);
      }
    })
    .catch(error => {
      state.error = error;
    })
    .finally(() => ((state.isFetching = false), self.postMessage(state)));
};
