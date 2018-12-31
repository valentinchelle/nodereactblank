import React, { Component } from 'react';
import axios from 'axios';
import FroalaEditorView from 'react-froala-wysiwyg';
import SubmitAnswer from './SubmitAnswer';
import auth from '../../Auth/Auth/Auth';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshArticle();
  }

  async refreshArticle() {
    const {
      match: { params }
    } = this.props;
    const article = (await axios.get(`${process.env.API_URL}/get-article/${params.articleId}`))
      .data;
    console.log(article);
    this.setState({
      article
    });
  }

  async submitAnswer(answer) {
    await axios.post(
      `${process.env.API_URL}/answer/${this.state.article.id}`,
      {
        answer
      },
      {
        headers: { Authorization: `Bearer ${auth.getIdToken()}` }
      }
    );
    await this.refreshArticle();
  }

  render() {
    const { article } = this.state;
    if (article === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{article.title}</h1>
            <td dangerouslySetInnerHTML={{ __html: article.content }} />
            <p className="lead" />
            <hr className="my-4" />

            <SubmitAnswer articleId={article.id} submitAnswer={this.submitAnswer} />
            <p>Answers:</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
