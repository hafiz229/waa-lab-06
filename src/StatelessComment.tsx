import React, { ChangeEvent, useRef } from "react";

interface User {
  uid: string;
  avatar: string;
  uname: string;
}

interface Comment {
  rpid: string;
  user: User;
  content: string;
  ctime: string;
  like: number;
}

interface AppProps {
  commentList: Comment[];
  tabType: string;
  content: string;
  currentUser: User;
  onPostComment: (userInfo: User, contentInfo: string) => void;
  onChangeContent: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onDeleteComment: (id: string) => void;
  onSortComment: (type: string) => void;
}

const tabs = [
  { type: "hot", text: "Top" },
  { type: "newest", text: "Newest" },
];

const StatelessComment = ({
  commentList,
  tabType,
  content,
  currentUser,
  onDeleteComment,
  onSortComment,
  onChangeContent,
  onPostComment,
}:AppProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePostButtonOnClick = () => {
    if(content?.trim()) {
      onPostComment(currentUser, content);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
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
              onClick={() => onSortComment(tabs[0]?.type)}
            >
              {tabs[0]?.text}
            </span>
            <span
              className={`nav-item ${
                tabType === tabs[1]?.type ? "active" : ""
              }`}
              onClick={() => onSortComment(tabs[1]?.type)}
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
                src={currentUser?.avatar}
                alt="Profile"
              />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* comment */}
            <textarea
              ref={textareaRef}
              className="reply-box-textarea"
              placeholder="tell something..."
              value={content}
              onChange={onChangeContent}
            />
            {/* post button */}
            <div
              className="reply-box-send"
              onClick={handlePostButtonOnClick}
            >
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
                        onClick={() => onDeleteComment(rpid)}
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

export default StatelessComment;
