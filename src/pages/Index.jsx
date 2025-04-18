
import { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import { AverageCalculatorService } from '../services/AverageCalculatorService';
import { SocialMediaService } from '../services/SocialMediaService';

export default function Index() {
  const [numberResponse, setNumberResponse] = useState(null);
  const [topUsers, setTopUsers] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [error, setError] = useState('');

  const authService = AuthService.getInstance();
  const averageCalcService = AverageCalculatorService.getInstance();
  const socialMediaService = SocialMediaService.getInstance();

  useEffect(() => {
    const init = async () => {
      try {
        const authResponse = await authService.register({
          email: "test@example.com",
          name: "Test User",
          rollNo: "123",
          githubUsername: "testuser",
          collegeName: "Test College",
          accessCode: "testcode"
        });

        const token = await authService.getToken({
          email: authResponse.email,
          name: authResponse.name,
          rollNo: authResponse.rollNo,
          accessCode: authResponse.accessCode,
          clientID: authResponse.clientID,
          clientSecret: authResponse.clientSecret
        });

        const numberResp = await averageCalcService.getNumbers('e');
        setNumberResponse(numberResp);

        const users = await socialMediaService.getTopUsers();
        setTopUsers(users);

        const posts = await socialMediaService.getTopPosts('popular');
        setTopPosts(posts);
      } catch (err) {
        setError(err.message || 'An error occurred');
      }
    };

    init();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">System Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {numberResponse && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Average Calculator</h2>
          <div className="bg-white shadow rounded p-4">
            <p>Previous State: {JSON.stringify(numberResponse.windowPrevState)}</p>
            <p>Current State: {JSON.stringify(numberResponse.windowCurrState)}</p>
            <p>New Numbers: {JSON.stringify(numberResponse.numbers)}</p>
            <p>Average: {numberResponse.avg}</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top Users</h2>
        <div className="bg-white shadow rounded overflow-hidden">
          {topUsers.map(user => (
            <div key={user.userId} className="border-b p-4">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">Comments: {user.commentCount}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top Posts</h2>
        <div className="bg-white shadow rounded overflow-hidden">
          {topPosts.map(post => (
            <div key={post.id} className="border-b p-4">
              <p className="font-medium">{post.content}</p>
              <p className="text-sm text-gray-600">Comments: {post.commentCount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
