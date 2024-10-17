// CommentContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { Comment } from "./types";
import dayjs from "dayjs";
import avatar from "../images/bozai.png";

interface CurrentUserType {
    uid: string;
    avatar: string;
    uname: string;
}

interface CommentContextType {
  commentList: Comment[];
  tabType: string;
  setTabType: (type: string) => void;
  addComment: (newComment: Comment) => void;
  deleteComment: (id: string) => void;
  currentUser: CurrentUserType
}

const getSortedComments = (commentList: Comment[], sortBy: string) => {
  if (!Array.isArray(commentList)) return [];

  return [...commentList].sort((a, b) => {
    if (sortBy === "newest") {
      const firstDate = dayjs(a.ctime, "MM-DD HH:mm");
      const secondDate = dayjs(b.ctime, "MM-DD HH:mm");
      return secondDate.valueOf() - firstDate.valueOf();
    } else if (sortBy === "hot") {
      return b.like - a.like;
    }
    return 0;
  });
};

export const CommentContext = createContext<CommentContextType | null>(null);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const [tabType, setTabType] = useState<string>("newest");

  const loadCommentList = async (tabType: string) => {
    const response = await fetch("http://localhost:3001/comments");
    const data = await response.json();
    const updatedData = getSortedComments(data, tabType);
    setCommentList(updatedData);
  }

  useEffect(() => {
    loadCommentList(tabType);
  }, [tabType]);

  const addComment = (newComment: Comment) => {
    const updatedComments = [...commentList, newComment];
    setCommentList(getSortedComments(updatedComments, tabType));
  };

  const deleteComment = (id: string) => {
    const updatedComments = commentList.filter((comment) => comment.rpid !== id);
    setCommentList(getSortedComments(updatedComments, tabType));
  };

  const handleTabChange = (type: string) => {
    setTabType(type);
    setCommentList(getSortedComments(commentList, type));
  };

  const currentUser = {
    uid: "30009257",
    avatar,
    uname: "John",
  };

  return (
    <CommentContext.Provider
      value={{ commentList, tabType, setTabType: handleTabChange, addComment, deleteComment, currentUser }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
    const context = useContext(CommentContext);
    if (!context) throw new Error("useComments must be used within CommentProvider");
    return context;
  };