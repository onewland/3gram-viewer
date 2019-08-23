import React from 'react';
import Axios from 'axios';
import { env } from './env';

const TableRow = ({row}) => {
    return (
        <tr>
            <td>{row.n1}</td>
            <td>{row.n2}</td>
            <td>{row.n3}</td>
            <td>{row.votes}</td>
        </tr>
    )
}

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { leaders: [] };
    }

    componentDidMount() {
        Axios.get(`http://${env['host']}:8080/ngram/leaders`)
        .then((response) => {
            var data = response.data;
            console.log(data)
            this.setState({
                leaders: data
            })
        })
    }

    render() {
        const { leaders } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="center col">
                        <h1>Hall of Fame</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table" id="leaderboard">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>Votes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaders.map((row) => <TableRow row={row} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}