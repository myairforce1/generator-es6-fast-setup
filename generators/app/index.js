'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const extend = require('deep-extend');
const path = require('path');

module.exports = class extends Generator {
  prompting = () => {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stellar ' + chalk.red('generator-es6-fast-setup') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Please input project name (es6_project):',
      default: 'es6_project'
    }, {
      type: 'input',
      name: 'projectVersion',
      message: 'Please input project version (0.0.1):',
      default: '0.0.1'
    }, {
      type: 'input',
      name: 'projectDesc',
      message: 'Please input project description:'
    }, {
      type: 'input',
      name: 'projectAuthor',
      message: 'Author:'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
       
    });
  }

  defaults = () => {

    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

  }


  writing = () => {
    let pkg = this.fs.readJSON(this.templatePath('package_tmpl.json'));
    
    extend(pkg, {
      dependencies: {
      },
      devDependencies: {
        'babel': '^6.23.0',
        'babel-core': '^6.24.1',
        'babel-cli': '^6.24.1',
        'babel-polyfill': '^6.23.0',
        'babel-preset-es2015': '^6.24.1',
        'babel-preset-stage-0': '^6.24.1',
        'babel-plugin-transform-runtime': '^6.23.0',
        'babel-loader': '^6.2.5',
        'webpack': '^2.5.0'
      }
    });
    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.main = this.props.projectVersion;
    pkg.author = this.props.projectAuthor;

   
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    mkdirp('dist/');

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
  }

  install = () => {
    this.installDependencies();
  }
};
