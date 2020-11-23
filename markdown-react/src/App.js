import React, { Component } from 'react';
import './App.css';
import { sampleText } from './sampleText';
import marked from 'marked';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      content: sampleText
    }

    this.handleUpdate = this.handleUpdate.bind( this );
    this.getMarkdownText = this.getMarkdownText.bind( this );
  }

  handleUpdate = ( event ) => {
    const content = event.target.value;
    this.setState({ content })
  }

  getMarkdownText = ( text ) => {
    const __html = marked( text, { sanitize: true });
    return { __html };
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <textarea 
              className="markdown__textarea" 
              onChange={this.handleUpdate}
              value={this.state.content}
            />
          </div>
          <div className="col-md-6">
            <div className="markdown__content">
              <p dangerouslySetInnerHTML={this.getMarkdownText(this.state.content)}></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;