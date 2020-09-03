self.onmessage = event => {
  const {
    data: [text, regexp],
    data,
  } = event;

  const results = text.matchAll(regexp);
  const answer = [];
  for (const match of results) {
    const result = {
      ...match.groups,
    };
    delete result.quote;
    answer.push(result);
  }

  self.postMessage(answer);
};
