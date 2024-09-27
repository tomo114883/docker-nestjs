import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';

// export const metadata: Metadata = {
//   title: 'Dashboard',
// };

export const Dashboard: NextPage = () => {
  const router = useRouter();
  const logout = async () => {
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
    </div>
  );
};
