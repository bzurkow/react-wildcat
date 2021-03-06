import React from "react";
import Helmet from "react-helmet";
import prefetch from "react-wildcat-prefetch";
import {nflCDN} from "application.config.js";

@prefetch(`${nflCDN}/config/anthology/superbowls/superbowls.json`)
class PrefetchExample extends React.Component {
    static propTypes = {
        asyncData: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        asyncData: {
            superBowls: []
        }
    };

    render() {
        const {asyncData: {superBowls}} = this.props;

        return (
            <div id="prefetch">
                <Helmet title="Prefetch Example" />

                <h1>Super Bowl Data</h1>

                {superBowls && (
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Year</th>
                                <th scope="col">Super Bowl</th>
                                <th scope="col">Matchup</th>
                            </tr>
                        </thead>
                        <tbody>
                            {superBowls.map((superBowl) => {
                                const [team1, team2] = superBowl.teams;

                                return (
                                    <tr key={superBowl.year}>
                                        <th scope="row">{superBowl.year}</th>
                                        <td>{superBowl.romanNumeral}</td>
                                        <td scope="row">{`${team1.location} ${team1.name} vs ${team2.location} ${team2.name}`}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default PrefetchExample;
