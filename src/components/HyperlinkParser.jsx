import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadPage } from '../api/parser';
import { useData } from '../hooks';
import { ANCHOR_REGEXP } from '../constants';

function HyperlinkParser(props) {
  const { url } = props;
  const getPage = useCallback(() => loadPage(url), [url]);
  const [{ isFetching, results, error }, setState] = useState({
    isFetching: false,
    results: [],
    error: null,
  });
  const handleParseBtnClick = useCallback(() => {
    if (url) {
      const worker = new Worker('/parser2.worker.js');
      worker.onmessage = ({ data }) => {
        setState(data);
      };

      worker.postMessage([url, new RegExp(ANCHOR_REGEXP, 'g')]);
    }
  }, [url]);

  return (
    <article>
      <h1>Hyperlink parser</h1>
      <button onClick={handleParseBtnClick}>parse</button>
      {isFetching && <div>Loading...</div>}
      <table>
        <caption>result</caption>
        <thead>
          <tr>
            <th>HREF</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ hrefValue, content }, index) => (
            <tr key={index}>
              <td>{hrefValue}</td>
              <td>{content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

HyperlinkParser.propTypes = {
  url: PropTypes.string.isRequired,
};

export default HyperlinkParser;
