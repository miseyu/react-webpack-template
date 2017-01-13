require('normalize.css/normalize.css');
require('styles/App.styl');

import React from 'react';
import Store from 'store';
import Superagent from 'superagent';
import Promise from 'bluebird';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import TopLogo from '../images/top-logo.jpg';

const tracking = () => {
  if (window.ga) {
    window.ga('send', 'pageview');
  }
};

class IndexComponent extends React.Component {

  constructor(props, context){
    super(props);
    context.router // will work
    this.state = { add_point: '' };
  }

  componentWillMount() {
    tracking();
    // surveyID
    this.survey_id = this.props.location.query.survey_id;
    if (!this.survey_id) {
      browserHistory.push('404');
      return;
    }
    const url = window.location.protocol + "//" + window.location.host + "/data/" + this.survey_id + ".json";
    Superagent.get(url)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          browserHistory.push('404');
          return;
        }
        const data = JSON.parse(response.text);
        this.setState({ add_point: String(data.add_point)});
      });
  }

  login(e) {
    Store.set(SURVEY_ID_KEY, this.survey_id);
  }

  redirect(e) {
    Store.set(SURVEY_ID_KEY, this.survey_id);
  }

  render() {
    return (
      <div className="wrap">
        <Header></Header>
        <div className="wrap-inner">
          <p className="display-text displayed-login-text1"></p>
          <div className="content">
            <img src={TopLogo} className="top-logo" />
            {(() => {
              return (
                <div>
                  <div className="displayed-top-text-description">
                    <div></div>
                  </div>
                </div>
                );
            })()}
          </div>
          <ul className="content-link">
            <li></li>
          </ul>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

IndexComponent.defaultProps = {
};


class CallbackComponent extends React.Component {

  componentWillMount() {
    tracking();
    this.survey_id = Store.get(SURVEY_ID_KEY);
    if (!this.survey_id) {
      browserHistory.push('404');
      return;
    }
    const url = window.location.protocol + "//" + window.location.host + "/data/" + this.survey_id + ".json";
    Superagent.get(url)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          window.location.href = '/404';
          return;
        }
      });
  }

  render() {
    return (
      <div className="wrap">
        <Header></Header>
        <div className="wrap-inner">
          <p className="display-text displayed-login-text1"></p>
          <div className="content"></div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

CallbackComponent.defaultProps = {
};

class SurveyCallbackComponent extends React.Component {

  componentWillMount() {
    tracking();
    this.cookie_id = this.props.location.query.cookie_id;
    if (!this.cookie_id) {
      browserHistory.push('404');
      return;
    }
    if (window.__cookieId__ !== this.cookie_id) {
      browserHistory.push('404');
      return;
    }
    this.survey_id = Store.get(SURVEY_ID_KEY);
    if (!this.survey_id) {
      browserHistory.push('404');
      return;
    }
    const url = window.location.protocol + "//" + window.location.host + "/data/" + this.survey_id + ".json";
    Superagent.get(url)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err) {
          browserHistory.push('404');
          return;
        }
      });
  }

  render() {
    return (
      <div className="wrap">
        <Header></Header>
        <div className="wrap-inner"></div>
        <Footer></Footer>
      </div>
    );
  }
}

SurveyCallbackComponent.defaultProps = {
};

class FinishComponent extends React.Component {

  componentWillMount() {
    tracking();
    this.survey_id = Store.get(SURVEY_ID_KEY);
    if (!this.survey_id) {
      browserHistory.push('404');
      return;
    }
    Store.remove(SURVEY_ID_KEY);
    this.add_point = Store.get(ADD_POINT);
    Store.remove(ADD_POINT);
  }

  render() {
    return (
      <div className="wrap">
        <Header></Header>
        <div className="wrap-inner">
          <p className="display-text displayed-login-text1"></p>
          <div className="content"></div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

FinishComponent.defaultProps = {
};

class ErrorPageComponent extends React.Component {

  componentWillMount() {
    tracking();
  }

  render() {
    return (
      <div className="wrap">
        <Header></Header>
        <div className="wrap-inner">
          <p className="display-text displayed-login-text1"></p>
          <div className="content"></div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

class NotFoundComponent extends ErrorPageComponent {

  get message() {
    return 'ページが存在しません!!'
  }
}
NotFoundComponent.defaultProps = {
};


render((
    <Router history={browserHistory}>
        <Route path="/" component={IndexComponent} />
        <Route path="/callback" component={CallbackComponent} />
        <Route path="/finish" component={FinishComponent} />
        <Route path="/404" component={NotFoundComponent} />
    </Router>
), document.getElementById('app'));
