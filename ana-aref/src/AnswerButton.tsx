import React from "react";


export class AnswerButton extends React.Component<any, any> {
    state: { wrongGuess: boolean };

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            wrongGuess: false,
        }
    }

    onGuess() {
        this.setState({wrongGuess: !this.props.isCorrect});
        if (this.props.isCorrect) {
            this.props.onCorrect();
        }
    }

    render() {
        return <button
            className={(this.state.wrongGuess ? "answer-btn-wrong" : "") + " answer-btn"}
            onClick={() => this.onGuess()}>
            {this.props.text}
        </button>
    }

}