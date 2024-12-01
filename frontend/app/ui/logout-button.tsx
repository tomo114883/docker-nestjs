'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';

export function Logout() {
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
      <ArrowRightStartOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer"
        onClick={logout}
      />
    </div>
  );
}
