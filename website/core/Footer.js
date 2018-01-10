/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('architecture.html', this.props.language)}>
              Architecture
            </a>
            <a href={this.docUrl('web_app_structure.html', this.props.language)}>
              Web Application Structure
            </a>
            <a href={this.docUrl('ci_cd.html', this.props.language)}>
              CI/CD Pipeline
            </a>
          </div>

          <div>
            <h5>Contacts</h5>
            <a href={siteConfig.profile.github}>
              Github
            </a>
            <a href={siteConfig.profile.linkedin}>
              LinkedIn
            </a>
            <a href={siteConfig.profile.website}>
              Portfolio
            </a>
          </div>
        </section>
        <section className="copyright">
          {siteConfig.citation}
        </section>
        <section className="copyright">
          {siteConfig.copyright}
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
