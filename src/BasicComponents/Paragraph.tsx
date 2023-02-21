import { observer } from "mobx-react";
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
    content: number;
    lastClicked: number;
    unfixed: boolean;
    onClick: React.Dispatch<React.SetStateAction<number>>;
    className?: string;
};

// Text for paragraphs - could extract these pretty easily from a file
let paragraph1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
laborum.`;

let paragraph2 = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`;

let paragraph3 = `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
will give you a complete account of the system, and expound the actual teachings of the great explorer of the
truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is
pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are
extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because
it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great
pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain
some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has
no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`;

let paragraph4 = `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id
quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
maiores alias consequatur aut perferendis doloribus asperiores repellat.`;

let paragraph5 = `On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by
the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that
are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is
the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to
distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able
to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances
and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to
be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of
selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse
pains.`;

// Suppose that our input is an length n array of paragraphs (paragraphContentArray) and an n by n array of scores between 0 and 1
// s.t. for i in [0..n), scores(i)(j) is the contradictoriness score of paras(j) against paras(i).

// Example data
let paragraphContentArray = [paragraph1, paragraph2, paragraph3, paragraph4, paragraph5];
let scores =
    [[0.134, 0.323, 0.591, 0.773, 0.935],
    [0.853, 0.831, 0.117, 0.380, 0.081],
    [0.445, 0.004, 0.162, 0.173, 0.797],
    [0.397, 0.499, 0.955, 0.571, 0.848],
    [0.275, 0.367, 0.804, 0.815, 0.933],
    ];

let colorLetters = ["a", "b", "c", "d", "e"];
let thresholds = [0.2, 0.4, 0.6, 0.8];

// returns integer between 0 and 4
function getColour(i: number, j: number): number {

    const score = scores[i][j];

    var k = 0;
    while (score > thresholds[k]) k++;
    return k;

}

function interpretScore(score: number): string {
    let interpretations = ["Very Low", "Low", "Medium", "High", "Very High"]
    var k = 0;
    while (score > thresholds[k]) k++;
    return interpretations[k];
}

export function overallScore(): string {
    return interpretScore(scores.flat().reduce((a, b) => Math.max(a, b), -1))
}

const Textbox = observer((props: Props) => {
    let colorClass = props.unfixed ? colorLetters[getColour(props.lastClicked, props.content)] : colorLetters[-1]

    if (props.unfixed) {
        return (
            <form className={props.className}>
                <Row>
                    <Col sm={9} className={colorClass}>
                        {paragraphContentArray[props.content]} 
                    </Col>
                    <Col sm={3}>
                    <React.Fragment>
                        <p><strong>Contradiction Risk:</strong> {interpretScore(scores[props.lastClicked][props.content])}</p>
                        <Button
                            variant="outline-dark"
                            size="sm"
                            className="float-right danger"
                            onClick={() => props.onClick(props.content)}>Examine</Button>
                    </React.Fragment>
                    </Col>
                </Row>
            </form>
        );
    } else {
        return (
            <React.Fragment>
                <form className={props.className}>
                    <Card>
                        <Card.Body className={colorClass}>
                            <Card.Text>
                                {paragraphContentArray[props.content]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </form>
            </React.Fragment>
        );
    }
});

export default Textbox;
