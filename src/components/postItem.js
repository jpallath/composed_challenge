import React, { Component } from "react";
import "../styles/postItem.css";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showBox(postItem) {}
  render() {
    const { caption, mainImage, onClick } = this.props;
    return (
      <div className="post-item" {...{ onClick }}>
        <div className="viewbox">View</div>
        {mainImage.url ? (
          <div className="content image">
            <img src={mainImage.url} alt={caption} />
          </div>
        ) : (
          <div className="content caption">
            <p>{caption}</p>
          </div>
        )}
      </div>
    );
  }
}

export default PostItem;
