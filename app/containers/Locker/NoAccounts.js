// @flow
import React, { Component } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccounts } from '../../actions/accounts';
import { clearConnection } from '../../actions/connection';
import PublicKeyIcon from '../../components/Shared/PublicKeyIcon';
import WebViewWrapper from '../../components/Shared/WebViewWrapper';

type Props = {
  accounts: {},
  loading: {},
  getAccounts: () => {},
  clearConnection: () => {}
};

class NoAccountsContainer extends Component<Props> {
  constructor() {
    super();
    this.state = {
      copied: false,
      success: false
    };

    this.successHandler = this.successHandler.bind(this);
  }

  successHandler = success => {
    this.setState({ success });
  }

  renderSteps = () => {
    const { copied, success } = this.state;
    return (
      <span>
        <p className="title">Create account steps</p>
        <ul className="steps">
          <li><span>{!copied ? <Icon name="arrow right" size="small" /> : ""}</span>Get public key</li>
          <li><span>{copied && !success ? <Icon name="arrow right" size="small" /> : ""}</span>Choose account name and proceed to payment</li>
          <li><span>{success ? <Icon name="arrow right" size="small" /> : ""}</span>Your account was succesfully created</li>
        </ul>
      </span>);
  };

  onLogin = () => {
    const { accounts } = this.props;
    this.props.getAccounts(accounts.publicKey.wif);
  };

  onCopyKey = copied => {
    this.setState({ copied });
  };

  onGoBack = () => {
    this.props.clearConnection();
  };

  renderFirst = () => {
    const { loading } = this.props;
    const disabled = !!loading.CREATE_CONNECTION;
    const content = (
      <div>
        <p>
          You need your public key to create an account.<br />Press a key icon to get your public key from Ledger Nano S.{' '}
          <PublicKeyIcon callback={this.onCopyKey} />
        </p>
        <br />
        <Button content="Back" disabled={disabled} onClick={this.onGoBack} />
      </div>
    );

    return content;
  };

  renderSecond = () => {
    const { accounts } = this.props;

    const webViewStyle = {
      display: 'inline-flex',
      width: '660px',
      height: '460px',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.15)',
      marginBottom: '1rem'
    };
    const content = (
      <div>
        <div>
          Public key{' '}
          <span className="public-key">{accounts.publicKey.wif}</span>
        </div>
        <br />
        <p>Now choose your account name. Then compare the keys, that we have already filled in for you.</p>
        <WebViewWrapper 
          style={webViewStyle} 
          publicKey={accounts.publicKey.wif} 
          onLogin={this.onLogin} 
          isSuccess={this.successHandler} 
        />
        <br />
      </div>
    );

    return content;
  };

  render() {
    const { copied } = this.state;

    return (
      <div className="no-account">
        <div className="create-account-steps">
          {this.renderSteps()}
        </div>
        <div className="create-account">
          <Form>
            <p className="title">Create Account</p>
            {!copied ? this.renderFirst() : this.renderSecond()}
          </Form>
        </div>
        <div className="take-space">&nbsp;</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAccounts,
      clearConnection
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  NoAccountsContainer
);
