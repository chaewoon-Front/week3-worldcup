import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./comment.css";
import { __postPost, __getPost } from "../../redux/modules/commentSlice";

function CommentInput() {
  const { isLoading, error, post } = useSelector((state) => state.post);
  console.log(post);

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newContent = {
      id: 1,
      title: "12",
      context: "1234",
      comment: [comment],
    };
    dispatch(__postPost(newContent));
  };

  return (
    <section className="commentwrap">
      <form className="commentInput" onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            console.log(e.target.value);
            console.log("현재 comment:", comment);
          }}
        />
        <button
          type="submit"
          // onClick={(e) => {
          //   const newComment = {
          //     postId: 0,
          //     id: 1,
          //     commenText: "축구 합니다!",
          //   };
          //   dispatch(__postPost(comment));
          //   console.log(newComment);
          // }}
        >
          입력
        </button>
      </form>
      <article>
        <ul className="commentContents">
          <li className="commentlist">
            {/* <p>{post[0]?.comment[0]?.commenText}</p> */}
            <div className="commentbtndiv">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </li>
          <li className="commentlist">
            {/* <p>{post[1]?.comment[0]?.commenText}</p> */}
            <div className="commentbtndiv">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default CommentInput;
