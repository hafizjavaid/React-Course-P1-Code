import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedId: null,
  };
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res.data);
      const posts = res.data.slice(0, 4);
      const updatedPost = posts.map((post) => {
        return {
          ...post,
          author: "Max",
        };
      });
      this.setState({ posts: updatedPost });
    });
    console.log("Hello");
  }
  postSelected = (id) => {
    this.setState({ selectedId: id });
  };
  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          title={post.title}
          author={post.author}
          key={post.id}
          clicked={() => this.postSelected(post.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
