import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    // grabbing the post id from reactrouter match object and in params which lists all wildcards in the url
    const { id } = this.props.match.params;
    
    this.props.fetchPost(id);
  }

  handleDelete() {
    const { id } = this.props.match.params;
    
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    });
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/" >Back to Index</Link>
        <button 
          onClick={this.handleDelete.bind(this)} className="btn btn-danger pull-xs-right">
            Delete
          </button>
        <h3>{post.title}</h3>
        <h6>{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// ownProps is all available props headed to this component
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);