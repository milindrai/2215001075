
import { api } from '../lib/api';

export class SocialMediaService {
  static instance = null;
  userCache = new Map();
  postCache = new Map();
  commentCountCache = new Map();

  static getInstance() {
    if (!SocialMediaService.instance) {
      SocialMediaService.instance = new SocialMediaService();
    }
    return SocialMediaService.instance;
  }

  async getTopUsers() {
    const response = await api.get('/users');
    const users = response.data.users;

    const postsResponse = await Promise.all(
      Object.keys(users).map(userId => 
        api.get(`/users/${userId}/posts`)
      )
    );

    const userCommentCounts = new Map();

    for (const response of postsResponse) {
      const posts = response.data.posts;
      for (const post of posts) {
        const commentsResponse = await api.get(`/posts/${post.id}/comments`);
        const commentCount = commentsResponse.data.comments.length;
        const userId = post.userid.toString();
        userCommentCounts.set(
          userId,
          (userCommentCounts.get(userId) || 0) + commentCount
        );
      }
    }

    return Array.from(userCommentCounts.entries())
      .map(([userId, commentCount]) => ({
        userId,
        name: users[userId],
        commentCount
      }))
      .sort((a, b) => b.commentCount - a.commentCount)
      .slice(0, 5);
  }

  async getTopPosts(type) {
    const response = await api.get(`/posts?type=${type}`);
    const posts = response.data.posts;

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentsResponse = await api.get(`/posts/${post.id}/comments`);
        return {
          ...post,
          commentCount: commentsResponse.data.comments.length
        };
      })
    );

    if (type === 'latest') {
      return postsWithComments
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);
    } else {
      return postsWithComments
        .sort((a, b) => b.commentCount - a.commentCount);
    }
  }
}
