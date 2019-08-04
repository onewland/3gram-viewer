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
        this.colors = ['lightgoldenrodyellow', 'lightsalmon','lightcoral','#CCFFC9','#C9CDFF','#FFC9FD'];
        this.state = { counter: 0, ngram: ['0','1','2'], cell_colors: ['lightgoldenrodyellow', 'lightsalmon','lightcoral'] };
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          5000
        );

        setInterval(
            () => this.randomColorChange(),
            1000
        );
        this.tick();
    }

    randomColorChange() {
        const randomCellIdx = Math.floor(Math.random() * 3);
        const colorCount = this.colors.length;
        var cell_colors = this.state.cell_colors;
        var randomColor;
        if(randomCellIdx === 0 || randomCellIdx === 2) {
            const adjacent = cell_colors[1];
            do {
                const randomColorIdx = Math.floor(Math.random() * colorCount);
                randomColor = this.colors[randomColorIdx];
                cell_colors[randomCellIdx] = randomColor;
            } while(adjacent === randomColor);
        } else {
            const adjacent = cell_colors[0];
            const adjacent2 = cell_colors[2];
            do {
                const randomColorIdx = Math.floor(Math.random() * colorCount);
                randomColor = this.colors[randomColorIdx];
                cell_colors[randomCellIdx] = randomColor;
            } while(adjacent === randomColor || adjacent2 === randomColor);
        }
        this.setState({ cell_colors: cell_colors })
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
      var colors = this.state.cell_colors;
      return (
        <div className="row">
            <div style={{backgroundColor: colors[0]}} className="col-sm ngram-col no-float" id="col-left">
                <p>{ngram[0]}</p>
            </div>
            <div style={{backgroundColor: colors[1]}} className="col-sm ngram-col no-float" id="col-center">
                <p>{ngram[1]}</p>
            </div>
            <div style={{backgroundColor: colors[2]}} className="col-sm ngram-col no-float" id="col-right">
                <p>{ngram[2]}</p>
            </div>
        </div>
      );
    }
}