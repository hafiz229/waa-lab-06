import { useState } from "react";
import "./App.scss";
import avatar from "./images/bozai.png";

interface User {
  uid: string;
  avatar: string;
  uname: string;
}

interface Comment {
  rpid: number;
  user: User;
  content: string;
  ctime: string;
  like: number;
}

// Comment List data
const defaultList = [
  {
    // comment id
    rpid: 3,
    // user info
    user: {
      uid: "13258165",
      avatar: "",
      uname: "Jay Zhou",
    },
    // comment content
    content: "Nice, well done",
    // created datetime
    ctime: "10-18 08:15",
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: "36080105",
      avatar: "",
      uname: "Song Xu",
    },
    content: "I search for you thousands of times, from dawn till dusk.",
    ctime: "11-13 11:29",
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: "30009257",
      avatar,
      uname: "John",
    },
    content:
      "I told my computer I needed a break... now it will not stop sending me vacation ads.",
    ctime: "10-19 09:00",
    like: 66,
  },
];
// current logged in user info
const user = {
  // userid
  uid: "30009257",
  // profile
  avatar,
  // username
  uname: "John",
};

const currentUser = user;

// Nav Tab
const tabs = [
  { type: "hot", text: "Top" },
  { type: "newest", text: "Newest" },
];

// Method for sorting comments
const getSortedComments = (commentList: Comment[], sortBy: string ) => {
  return [...commentList].sort((a, b) => {
    if(sortBy === "newest") {
      const firstDate = new Date(`2024-${a?.ctime}`);
      const secondDate = new Date(`2024-${b?.ctime}`);
      return secondDate?.getTime() - firstDate?.getTime();
    } else if (sortBy === "hot") {
      return b?.like - a?.like;
    }
    return 0;
  })
}

const App = () => {
  const [commentList, setCommentList] = useState(defaultList);
  const [tabType, setTabType] = useState("newest");

  const handleDeleteOnClick = (id: Number) => {
    const updatedCommentList = commentList?.filter(({ rpid }) => rpid !== id);
    setCommentList(updatedCommentList);
  };

  const handleTabOnClick = (type: string) => {
    setTabType(type);

    const sortedComments = getSortedComments(commentList, type);
    setCommentList(sortedComments);
  }

  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Like */}
            <span className="total-reply">{commentList?.length}</span>
          </li>
          <li className="nav-sort">
            {/* highlight class name： active */}
            <span
              className={`nav-item ${
                tabType === tabs[0]?.type ? "active" : ""
              }`}
              onClick={() => handleTabOnClick(tabs[0]?.type)}
              // onClick={() => setTabType(tabs[0]?.type)}
            >
              {tabs[0]?.text}
            </span>
            <span
              className={`nav-item ${
                tabType === tabs[1]?.type ? "active" : ""
              }`}
              onClick={() => handleTabOnClick(tabs[1]?.type)}
              // onClick={() => setTabType(tabs[1]?.type)}
            >
              {tabs[1]?.text}
            </span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
          {/* current logged in user profile */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img
                className="bili-avatar-img"
                src={user?.avatar}
                alt="Profile"
              />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* comment */}
            <textarea
              className="reply-box-textarea"
              placeholder="tell something..."
            />
            {/* post button */}
            <div className="reply-box-send">
              <div className="send-text">post</div>
            </div>
          </div>
        </div>

        {/* comment list */}
        <div className="reply-list">
          {/* comment item */}
          {commentList?.map(({ rpid, user, content, ctime, like }) => (
            <div key={rpid} className="reply-item">
              {/* profile */}
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img className="bili-avatar-img" alt="" src={user?.avatar} />
                </div>
              </div>

              <div className="content-wrap">
                {/* username */}
                <div className="user-info">
                  <div className="user-name">{user?.uname}</div>
                </div>
                {/* comment content */}
                <div className="root-reply">
                  <span className="reply-content">{content}</span>
                  <div className="reply-info">
                    {/* comment created time */}
                    <span className="reply-time">{ctime}</span>
                    {/* total likes */}
                    <span className="reply-time">Like:{like}</span>
                    {user?.uid === currentUser?.uid ? (
                      <span
                        className="delete-btn"
                        onClick={() => handleDeleteOnClick(rpid)}
                      >
                        Delete
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
