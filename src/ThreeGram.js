import React from 'react';
import Axios from 'axios';

export default class ThreeGram extends React.Component {
    constructor(props) {
        super(props);
        this.ngramsList = [
            ["against",	"my",	"stomach"],
            ["regard",	"for",	"her"],
            ["the",	"curtain",	"back"],
            ["for",	"the",	"cancellation"],
            ["in",	"moscow",	"or"],
            ["i",	"may",	"well"],
            ["your",	"travel",	"plans"],
            ["although",	"the",	"nature"],
        ];
        this.cycleLength = this.ngramsList.length;
        this.state = { counter: 0, ngram: ['0','1','2'] };
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          10000
        );
    }

    tick() {
        Axios.get("http://localhost:8080/ngram")
        .then((response) => {
            var data = response.data;
            this.setState({
                counter: this.state.counter + 1,
                ngram: [data['n1'],data['n2'],data['n3']]
            })
        })
    }

    render() {
      var ngram = this.state.ngram;
      return (
        <div className="row">
            <div className="col-sm ngram-col no-float" id="col-left">
                <p>{ngram[0]}</p>
            </div>
            <div className="col-sm ngram-col no-float" id="col-center">
                <p>{ngram[1]}</p>
            </div>
            <div className="col-sm ngram-col no-float" id="col-right">
                <p>{ngram[2]}</p>
            </div>
        </div>
      );
    }
}