import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

// Mock data for Instagram posts from hiteshraut22 (replace with API data in production)
const mockPosts = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/300x300?text=hiteshraut22+Post+1',
    caption: 'Powering through the gym! 💪 #FitnessJourney #hiteshraut22',
    likes: 150,
    postedAt: '3h ago',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/300x300?text=hiteshraut22+Post+2',
    caption: 'Morning run vibes! 🏃‍♂️ #HealthyLiving #hiteshraut22',
    likes: 90,
    postedAt: '6h ago',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/300x300?text=hiteshraut22+Post+3',
    caption: 'New workout gear! 🔥 #GymMotivation #hiteshraut22',
    likes: 220,
    postedAt: '1d ago',
  },
];

// Styled components
const InstagramSection = styled.section`
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const PostsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const PostCard = styled.div`
  width: 300px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 15px;
`;

const Caption = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
`;

const InstagramPosts = () => {
  const [posts, setPosts] = useState(mockPosts);

  // Example of how to fetch real Instagram posts (uncomment and configure with API access)
  
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // Replace with your Instagram API access token and user ID
        const accessToken = 'YOUR_ACCESS_TOKEN';
        const userId = 'USER_ID_FOR_hiteshraut22';
        const response = await fetch(
          `https://graph.instagram.com/${userId}/media?fields=id,media_url,caption,permalink,timestamp&limit=3&access_token=${accessToken}`
        );
        const data = await response.json();
        if (data.data) {
          const formattedPosts = data.data.map((post) => ({
            id: post.id,
            imageUrl: post.media_url,
            caption: post.caption || 'No caption',
            likes: 0, // Likes require additional API call or approximation
            postedAt: new Date(post.timestamp).toLocaleDateString(),
          }));
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      }
    };
    fetchInstagramPosts();
  }, []);


  return (
    <InstagramSection>
      <Title>Latest from @hiteshraut22</Title>
      <PostsContainer>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <PostImage src={post.imageUrl} alt="Instagram post by hiteshraut22" />
            <PostContent>
              <Caption>{post.caption}</Caption>
              <PostMeta>
                <span>{post.likes} Likes</span>
                <span>{post.postedAt}</span>
              </PostMeta>
            </PostContent>
          </PostCard>
        ))}
      </PostsContainer>
    </InstagramSection>
  );
};

export default InstagramPosts;