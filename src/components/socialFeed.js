import React, { Component } from "react";
import axios from "axios";
import { debounce } from "lodash";
import PostItem from "./postItem";
import "../styles/socialFeed.css";

class SocialFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      detail: "",
      detailStatus: "",
      lightboxStatus: "invisble",
      apicaller:
        "https://taneleer.composedcreative.com/api/v1/feed/a0329f16-9225-11e6-89bb-296a97b9d609/fabb8b71-496e-11e8-afe9-1253691739d7"
    };
    this.showBox = this.showBox.bind(this);
    this.closeBox = this.closeBox.bind(this);
    this.handleBottomScroll = this.handleBottomScroll.bind(this);
    this.isScrolledIntoView = this.isScrolledIntoView.bind(this);
  }

  showBox(postItem) {
    console.log(postItem);
    let detail = postItem.mainImage.url
      ? postItem.mainImage.url
      : postItem.caption;
    let detailStatus = postItem.mainImage.url ? "image" : "text";
    this.setState({
      lightboxStatus: "visible",
      detail: detail,
      detailStatus: detailStatus
    });
  }

  closeBox() {
    this.setState({
      lightboxStatus: "invisble"
    });
  }

  componentDidMount() {
    this.Posts();
    window.addEventListener("scroll", this.handleBottomScroll, false);
  }

  Posts() {
    axios.get(this.state.apicaller).then(res => {
      let posts = this.state.posts.concat(res.data.data);
      const apicaller = res.data.links.next;
      // console.log(this.state.apicaller);
      this.setState({ posts: posts, apicaller: apicaller });
    });
  }

  handleBottomScroll = debounce(() => {
    let x = document.getElementById("social").lastChild;
    if (this.isScrolledIntoView(x)) {
      this.Posts();
    }
  }, 500);

  isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;
    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    return isVisible;
  }
  render() {
    let { posts, detail, detailStatus, lightboxStatus } = this.state;
    let allPosts = posts.map(post => (
      <PostItem key={post.id} {...post} onClick={() => this.showBox(post)} />
    ));
    return (
      <div id="social" className="social-feed">
        {allPosts}
        <div
          className={
            lightboxStatus === "invisble" ? "lightbox" : "lightbox active"
          }
          onClick={this.closeBox}
        >
          <div className="container">
            <button className="close-button" onClick={this.closeBox}>
              X
            </button>
            {detailStatus === "image" ? (
              <img src={detail} alt="tepid" />
            ) : (
              <div className="texted-detail">{detail}</div>
            )}
          </div>
        </div>
        <div id="end" onScroll={this.handleBottomScroll}>
          <i className="fas fa-cog" />
        </div>
      </div>
    );
  }
}

export default SocialFeed;
