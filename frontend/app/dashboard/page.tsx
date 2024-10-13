import { Metadata } from 'next';
import Logout from '../ui/logout-button';
import { UserInfo } from '../ui/user-info';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Logout />
      <UserInfo />
    </div>
  );
}
