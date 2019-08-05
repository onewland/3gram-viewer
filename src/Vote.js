import React from 'react';
import Axios from 'axios';

export default class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n1: "LOADING",
            n2: "YOUR",
            n3: "TRIPLET",
            vote_state: "pending"
        }
    }

    componentDidMount() {
        Axios.get("http://localhost:8080/ngram")
        .then((response) => {
            var data = response.data;
            this.setState({
                id: data.id,
                n1: data.n1,
                n2: data.n2,
                n3: data.n3
            })
        })
    }

    doVote() {
        const { id, vote_state } = this.state
        if(vote_state === 'voted') { 
            return;
        }
        console.log("attempting vote");
        Axios.post("http://localhost:8080/ngram/" + id + "/vote")
        .then((response) => {
            this.setState({
                vote_state: "voted"
            })
        })
    }

    voteButton() {
        const messages = {
            "pending": "This is a good triple",
            "voted": "Vote submitted"
        }
        const classVals = {
            "pending": "btn btn-primary",
            "voted": "btn btn-primary disabled"
        }
        return (
            <button className={classVals[this.state.vote_state]}
                    id="vote-now" 
                    onClick={() => this.doVote()}>
                {messages[this.state.vote_state]}
            </button>
        );
    }

    render() {
        const {n1, n2, n3} = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1 style={{textAlign: "center"}}>🇺🇸🇫🇷🇧🇸&nbsp;&nbsp;&nbsp;VOTE&nbsp;&nbsp;&nbsp;🇨🇦🇬🇧🇲🇦</h1>
                    </div>
                </div>
                <div className="row middle-row-vote-page">
                    <div className="col">
                        <h1>{n1}</h1>
                    </div>
                    <div className="col">
                        <h1>{n2}</h1>
                    </div>
                    <div className="col">
                        <h1>{n3}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{textAlign: "center"}}>
                        {this.voteButton()}
                    </div>
                </div>
            </div>
        );
    }
}