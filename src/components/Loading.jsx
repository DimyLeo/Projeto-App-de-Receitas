import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="div-load">
      <div className="div-1">
        <div className="card-load">
          <span className="card-p" />
        </div>
        <div className="icons-load">
          <span className="icon-1-load" />
          <span className="icon-2-load" />
        </div>
      </div>
      <div className="ingredients-load">
        <span className="li-load-1" />
        <span className="li-load-2" />
        <span className="li-load-3" />
        <span className="li-load-4" />
      </div>
      <div className="instructions-load">
        <span className="linha-load-1" />
        <span className="linha-load-2" />
        <span className="linha-load-3" />
        <span className="linha-load-4" />
        <span className="linha-load-5" />
        <span className="linha-load-6" />
        <span className="linha-load-7" />
      </div>
    </div>
  );
}

export default Loading;
