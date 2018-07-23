// @flow
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Lock from './Home/Lock';
import NoAccounts from './Home/NoAccounts';
import Connection from './Home/Connection';
import ListAccounts from './Home/ListAccounts';
import Inactivity from './Home/Inactivity';
import styles from './Home.css';

type Props = {
  states: {},
  accounts: {}
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const { states, accounts } = this.props;

    let mainSegment = <Lock />;
    if (states.deviceConnected && accounts.publicKey === null) {
      mainSegment = <Inactivity />;
    }

    if (
      states.deviceConnected &&
      !states.nodeConnected &&
      accounts.publicKey !== null
    ) {
      mainSegment = <Connection />;
    }

    if (
      states.deviceConnected &&
      states.nodeConnected &&
      states.accountsRequested &&
      states.accountsRetrieved &&
      accounts.names.length === 0
    ) {
      mainSegment = <NoAccounts accounts={accounts} />;
    }

    if (
      states.deviceConnected &&
      states.nodeConnected &&
      states.accountsRetrieved &&
      accounts.names.length > 0
    ) {
      mainSegment = <ListAccounts accounts={accounts.names} />;
    }

    return (
      <Grid stretched textAlign="center" verticalAlign="middle" className="locker">
        <Grid.Row />
        <Grid.Row columns={3} className="container">
          <Grid.Column width={4} />
          <Grid.Column width={8}>{mainSegment}</Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
        <Grid.Row />
      </Grid>
    );
  }
}
