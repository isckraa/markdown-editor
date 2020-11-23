import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { sampleText } from './sampleText';
import marked from 'marked';

const App = ( props ) => {
    const [ content, setContent ] = useState('');
    const mounted = useRef();

    useEffect( () => {
      if (!mounted.current) {
        // do componentDidMount logic
        const data = localStorage.getItem( 'markdownData' );
  
        if ( data ) {
          setContent( data );
        } else {
          setContent( sampleText );
        }
        mounted.current = true;
      } else {
        // do componentDidUpdate logic
        localStorage.setItem( 'markdownData', content );
      }
    }, [content] );

    const handleUpdate = ( event ) => {
      const value = event.target.value;
      setContent( value );
    }

    const getMarkdownText = ( text ) => {
      const __html = marked( text, { sanitize: true });
      return { __html };
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <textarea 
              className="markdown__textarea" 
              onChange={handleUpdate}
              value={content}
            />
          </div>
          <div className="col-md-6">
            <div className="markdown__content">
              <p dangerouslySetInnerHTML={getMarkdownText(content)}></p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;