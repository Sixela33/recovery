export interface Guardian {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline';
  responseTime: string;
  trustLevel: 'High' | 'Medium' | 'Low';
}

export async function getGuardians(account: string): Promise<Guardian[]> {
  // Mock data - in a real implementation, this would make an API call
  // using the account parameter to fetch guardians for that specific account
  
  return [
    {
      id: 1,
      name: 'Sarah Kim',
      email: 'sarah.kim@gmail.com',
      avatar: '👩‍💼',
      status: 'online',
      responseTime: 'Usually responds in 5 min',
      trustLevel: 'High'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.j@gmail.com',
      avatar: '👨‍💻',
      status: 'online',
      responseTime: 'Usually responds in 10 min',
      trustLevel: 'High'
    },
    {
      id: 3,
      name: 'Lisa Wang',
      email: 'lisa.wang@gmail.com',
      avatar: '👩‍🎨',
      status: 'offline',
      responseTime: 'Last seen 2 hours ago',
      trustLevel: 'Medium'
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david.chen@gmail.com',
      avatar: '👨‍🔬',
      status: 'online',
      responseTime: 'Usually responds in 15 min',
      trustLevel: 'High'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      email: 'emma.wilson@gmail.com',
      avatar: '👩‍🏫',
      status: 'online',
      responseTime: 'Usually responds in 8 min',
      trustLevel: 'High'
    }
  ];
}
