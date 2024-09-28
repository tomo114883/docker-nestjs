import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '../ui/UserInfo';

// export const metadata: Metadata = {
//   title: 'Dashboard',
// };

export const Dashboard: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    // Remove a cache for the user when the user logout.
    queryClient.removeQueries({ queryKey: ['user'] });
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/');
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <ArrowLeftEndOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
    </div>
  );
};
