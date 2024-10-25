'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';

export default function Logout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = async () => {
    // Remove a cache for the user when the user logout.
    queryClient.removeQueries({ queryKey: ['user'] });
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push('/auth');
  };
  return (
    <div>
      <ArrowLeftEndOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
    </div>
  );
}
