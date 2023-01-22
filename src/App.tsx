import React, { useState } from 'react';
import Paragraph from "./BasicComponents/Paragraph";
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  // Contradictoriness of each paragraph - 0 is most contradictory, 4 is least contradictory
  // -1 is plain color (used for focus paragraph on the left)
  // Could also extract this from a file or something
  let paragraphContradictionArray = [1, 3, 4, 2, 0];
  let basicArray = [0, 1, 2, 3, 4];

  let paragraphArray = basicArray.map((item, index) => {
    return <Paragraph 
              content={item} 
              color={paragraphContradictionArray[index]} 
              onClick={() => setFixedParagraph(item)} 
              includeFooter={true}
              className="card-padding" 
            />
  })

  const [fixedParagraph, setFixedParagraph] = useState(4);

  let myComponent = <Paragraph 
                      content={fixedParagraph} 
                      color={-1} 
                      onClick={() => setFixedParagraph(1)}
                      includeFooter={false}
                      className="card-fixed"/>

  return (
    <div className="App">
      <header className="App-header">
          Contradiction catcher
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
