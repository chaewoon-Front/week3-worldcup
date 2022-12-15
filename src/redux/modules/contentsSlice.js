import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// react toolkit에서는 Action Creator, Action Value 부분이 없어졌음.

const initialState = {
  post: [],
  comments: [],
  isLoading: false,
  error: null,
};

export const __getpost = createAsyncThunk(
  "getPost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:3001/post`);
      //       const posttlist = post.find((post) => {
      //   return post.id === Number(id);
      // });
      return thunkAPI.fulfillWithValue(data.data);

      // console.log(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // console.log("데이터를 불러오지 못했습니다.");
    }
  }
);

export const __DeletePost = createAsyncThunk(
  "deletePost",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(`http://localhost:3001/post/${payload}`);
      //       const posttlist = post.find((post) => {
      //   return post.id === Number(id);
      // });
      return thunkAPI.fulfillWithValue(data.data);

      // console.log(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      // console.log("데이터를 불러오지 못했습니다.");
    }
  }
);

export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`http://localhost:3001/comments`);
      // console.log(data.data);
      // console.log(data.data.filter((comment) => comment.postId === payload));
      // 네트워크 요청이 성공한 경우 dispatch해주는 기능을 가진 API (Propmise가 resolved된 경우)

      return thunkAPI.fulfillWithValue(data.data); // 성공을 하면 fulfillWithValue에 의해 생성된 todos, getTodos, fullfilled라는 action이 dispatch되었다.
    } catch (error) {
      console.log(error);
      // 네트워크 요청이 실패한 경우 dispatch해주는 기능을 가진 API (Promise가 rejected된 경우)
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//(2)
//try {}안에서 서버에 요청할 동작들이 들어가 있음!!
//axios.post 라는 동작은 서버에다 data를 넣으라는 동작이고,
//axios.post에 요청을 할때에는 집 주소와 우리가 넣을 값 payload를 넣어준다
//만약에 이 서버에 요청도중 error가 발생한다면 catch{}가 실행된다.
export const __postComments = createAsyncThunk(
  "postComment",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const { data } = await axios.post(
        `http://localhost:3001/comments`,
        payload
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log("데이터를 불러오지 못했습니다");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __DeleteComments = createAsyncThunk(
  "deleteComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.delete(
        `http://localhost:3001/comments/${payload}`
      );
      // console.log(data.data);
      // console.log(data.data.filter((comment) => comment.postId === payload));
      // 네트워크 요청이 성공한 경우 dispatch해주는 기능을 가진 API (Propmise가 resolved된 경우)

      return thunkAPI.fulfillWithValue(data.data); // 성공을 하면 fulfillWithValue에 의해 생성된 todos, getTodos, fullfilled라는 action이 dispatch되었다.
    } catch (error) {
      console.log(error);
      // 네트워크 요청이 실패한 경우 dispatch해주는 기능을 가진 API (Promise가 rejected된 경우)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: {
    [__getpost.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getpost.fulfilled]: (state, action) => {
      // console.log(state, action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.post = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getpost.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    //코멘트
    [__getComments.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComments.fulfilled]: (state, action) => {
      // console.log(state, action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__postComments.fulfilled]: (state, action) => {
      // console.log(state, action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments.push(action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    //(3)
    //post.fulfilled는 서버에서 성공되었을때를 처리해주는 동작을 넣어줘야 한다.
    //서버에다 넣어준 값만 바꿔주고 우리가 갖고 있는 state.comments를 바꿔줘야 한다!!
    //그래서 .Push를 실행
    //action.payload -> 서버에 대한 결과값???을 넣어줌
    //extrareducer가 있는 이유는 ->createAsyncThunk 이 부분은 아직 서버에 값만 변경된 상태이지 우리의 state가 변경된게 아니다
    // 그래서 이 부분을 바꿔주는 부분이 extrareducer다!!!
    //성공되었을 때 fulfilled다

    [__DeleteComments.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__DeleteComments.fulfilled]: (state, action) => {
      // console.log(state, action);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__DeleteComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = contentsSlice.actions;

// reducer 는 configStore에 등록하기 위해 export default 합니다.

export default contentsSlice.reducer;
