import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';

class PostsNew extends Component {
  // need to bring in field obj for reduxForm to work
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input 
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content" 
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/' className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

/* validate called automagically by reduxForm */
function validate(values) {
  const errors = {};

  // validate inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter a Category";
  }
  if (!values.content) {
    errors.content = "Enter content";
  }
  // If errors is empty, form is fine to submit
  // If errors has any properties redux form assums form is invalid
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);