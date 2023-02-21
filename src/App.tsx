import React, { useState } from 'react';
import Paragraph from "./BasicComponents/Paragraph";
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  let basicArray = [0, 1, 2, 3, 4];

  const [fixedParagraph, setFixedParagraph] = useState(0);

  let paragraphArray = basicArray.map((item, index) => {
    return <Paragraph 
              content={item} 
              lastClicked={fixedParagraph}
              onClick={() => setFixedParagraph(item)} 
              unfixed={true}
              className="card-padding" 
            />
  })

  let myComponent = <Paragraph 
                      content={fixedParagraph} 
                      lastClicked={fixedParagraph} 
                      onClick={() => setFixedParagraph(1)}
                      unfixed={false}
                      className="card-fixed"/>

  return (
    <div className="App">
      <header className="App-header">
          ContraVerse
      </header>
      <body>
        <Container>
            <Row>
              <Col>{myComponent}</Col>
              <Col>{paragraphArray}</Col>
            </Row>
          </Container>
      </body>
      <footer className="App-footer">
        Law & CS - Group 2
      </footer>
    </div>
  );
}

export default App;
