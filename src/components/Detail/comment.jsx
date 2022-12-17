import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  __getComments,
  __DeleteComments,
  __postComments,
  __getPost,
} from "../../redux/modules/contentsSlice";
import "./comment.css";
// import { __getPost, __postPost } from "../../redux/modules/commentSlice";

//----------------
//(1)
//db에서 comments 라는 집이 생김!
//modules에서 서버에 요청할때에도 주소를 바꿔줘야 함
//useSelector 부분에서 comments라는 data 받아와야됨!
//댓글을 입력하면 서버에 댓글입력한 내용을 넣어줘야 함(POST 요청을 보냄) -> 서버 주소: comments라는 서버주소
//댓글은 payload가 됨!!
// useSelector 부분은 extrareducer에서 보내준 로딩일때 에러일때 성공되었을때(값)을 받는다
//32번째 comments가 모든 댓글이 됨

//-----------------

function CommentInput() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const { isLoading, error, comments } = useSelector((state) => state.content);
  console.log("코멘트입니다:", comments);

  const commentlist = comments.filter((comment) => {
    return comment?.postId === Number(id);
  });
  console.log("코멘트 나오나?", commentlist);

  const DeleteHandler = (id) => {
    dispatch(__DeleteComments(id));
    window.location.href = "/main";
  };
  const AddClick = () => {
    dispatch(
      __postComments({
        postId: 2,
        id: Date.now(),
        comment: comment,
      })
    );
  };
  //버튼이 클릭 되었을때 dispatch로 서버에 요청
  // 그 요청이 하는 동작은(__postComments) -> 서버에다 댓글을(우리가 입력한) 넣는 동작
  //postComments()안에 있는 내용은 payload가 됨!
  //-comment페이지 안에 일어나는 동작들-

  useEffect(() => {
    dispatch(__getComments());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <section className="commentwrap">
      <form
        className="commentInput"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            console.log(e.target.value);
            console.log("현재 comment:", comments);
          }}
        />
        <button onClick={AddClick}>입력</button>
      </form>
      <article>
        <ul className="commentContents">
          {commentlist?.map((comment) => (
            <li className="commentlist">
              <p>{comment.comment}</p>

              {/* <p>{post[0]?.comment[0]?.commenText}</p> */}
              <div className="commentbtndiv">
                <button>수정</button>
                <button
                  onClick={() => {
                    DeleteHandler(comment.id);
                  }}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default CommentInput;
