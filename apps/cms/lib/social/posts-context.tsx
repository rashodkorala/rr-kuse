"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
  useEffect,
} from "react";
import { MOCK_SCHEDULED_POSTS, ScheduledPost } from "./mock-data";
import { PlatformId } from "./platform-styles";

type Action =
  | { type: "ADD_POST"; post: ScheduledPost }
  | { type: "UPDATE_POST"; id: string; updates: Partial<ScheduledPost> }
  | { type: "DELETE_POST"; id: string }
  | { type: "SET_STATUS"; id: string; status: ScheduledPost["status"] };

type PostsState = {
  posts: ScheduledPost[];
};

function postsReducer(state: PostsState, action: Action): PostsState {
  switch (action.type) {
    case "ADD_POST":
      return { posts: [action.post, ...state.posts] };
    case "UPDATE_POST":
      return {
        posts: state.posts.map((p) =>
          p.id === action.id ? { ...p, ...action.updates } : p
        ),
      };
    case "DELETE_POST":
      return { posts: state.posts.filter((p) => p.id !== action.id) };
    case "SET_STATUS":
      return {
        posts: state.posts.map((p) =>
          p.id === action.id ? { ...p, status: action.status } : p
        ),
      };
    default:
      return state;
  }
}

type PostsContextValue = {
  posts: ScheduledPost[];
  addPost: (data: {
    content: string;
    scheduledAt: string;
    platforms: PlatformId[];
    platformOverrides?: Partial<Record<PlatformId, string>>;
    mediaUrl?: string;
  }) => ScheduledPost;
  updatePost: (id: string, updates: Partial<ScheduledPost>) => void;
  deletePost: (id: string) => void;
  setStatus: (id: string, status: ScheduledPost["status"]) => void;
  showToast: (message: string) => void;
};

const PostsContext = createContext<PostsContextValue | null>(null);

let idCounter = 1000;

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: MOCK_SCHEDULED_POSTS,
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const addPost = useCallback(
    (data: {
      content: string;
      scheduledAt: string;
      platforms: PlatformId[];
      platformOverrides?: Partial<Record<PlatformId, string>>;
      mediaUrl?: string;
    }): ScheduledPost => {
      const post: ScheduledPost = {
        id: `post-${++idCounter}`,
        content: data.content,
        scheduledAt: data.scheduledAt,
        platforms: data.platforms,
        platformOverrides: data.platformOverrides ?? {},
        mediaUrl: data.mediaUrl,
        status: "scheduled",
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: "ADD_POST", post });
      return post;
    },
    []
  );

  const updatePost = useCallback(
    (id: string, updates: Partial<ScheduledPost>) =>
      dispatch({ type: "UPDATE_POST", id, updates }),
    []
  );

  const deletePost = useCallback(
    (id: string) => dispatch({ type: "DELETE_POST", id }),
    []
  );

  const setStatus = useCallback(
    (id: string, status: ScheduledPost["status"]) =>
      dispatch({ type: "SET_STATUS", id, status }),
    []
  );

  return (
    <PostsContext.Provider
      value={{
        posts: state.posts,
        addPost,
        updatePost,
        deletePost,
        setStatus,
        showToast,
      }}
    >
      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-[100] max-w-sm rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          {toast}
        </div>
      ) : null}
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
}
