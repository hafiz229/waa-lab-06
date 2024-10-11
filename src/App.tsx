import { ChangeEvent, useState } from "react";
import avatar from "./images/bozai.png";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import StatelessComment from "./StatelessComment";

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

// Comment List data
const defaultList = [
  {
    // comment id
    rpid: "3",
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
    rpid: "2",
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
    rpid: "1",
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
// const tabs = [
//   { type: "hot", text: "Top" },
//   { type: "newest", text: "Newest" },
// ];

// Method for sorting comments
const getSortedComments = (commentList: Comment[], sortBy: string) => {
  return [...commentList].sort((a, b) => {
    if (sortBy === "newest") {
      const firstDate = dayjs(a?.ctime, "MM-DD HH:mm");
      const secondDate = dayjs(b?.ctime, "MM-DD HH:mm");
      return secondDate?.valueOf() - firstDate?.valueOf();
    } else if (sortBy === "hot") {
      return b?.like - a?.like;
    }
    return 0;
  });
};

const App = () => {
  const [commentList, setCommentList] = useState<Comment[]>(defaultList);
  const [tabType, setTabType] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onDeleteComment = (id: string) => {
    const updatedCommentList = commentList?.filter(({ rpid }) => rpid !== id);
    setCommentList(updatedCommentList);
  };

  const onSortComment = (type: string) => {
    setTabType(type);

    const sortedComments = getSortedComments(commentList, type);
    setCommentList(sortedComments);
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e?.target?.value);
  };

  const onPostComment = (userInfo: User, contentInfo: string) => {
    const newItem = {
      rpid: uuidv4(),
      user: userInfo,
      content: contentInfo,
      ctime: dayjs().format("MM-DD HH:mm"),
      like: 0,
    };

    const sortedComments = getSortedComments(
      [...commentList, newItem],
      tabType
    );

    setCommentList(sortedComments);
    setContent("");
  };

  return (
    <StatelessComment
      commentList={commentList}
      tabType={tabType}
      content={content}
      currentUser={currentUser}
      onDeleteComment={onDeleteComment}
      onSortComment={onSortComment}
      onChangeContent={onChangeContent}
      onPostComment={onPostComment}
    />
  );
};

export default App;
