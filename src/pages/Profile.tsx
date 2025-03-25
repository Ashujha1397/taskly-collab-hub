
import React from 'react';
import { Layout } from '@/components/Layout';
import { UserProfile } from '@/components/UserProfile';

const sampleUser = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: 'https://i.pravatar.cc/150?img=36',
  role: 'Product Manager',
  department: 'Product Development',
  location: 'San Francisco, CA',
  joinDate: 'January 15, 2023',
};

const Profile = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight mb-6">User Profile</h1>
        <UserProfile user={sampleUser} />
      </div>
    </Layout>
  );
};

export default Profile;
