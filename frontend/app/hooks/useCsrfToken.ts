import { useEffect } from 'react';
import axios from 'axios';

// Get csrf token and set it to axios headers as a response at the first render.
export const useCsrfToken = () => {
  useEffect(() => {
    let ignore = false;

    const getCsrfToken = async () => {
      try {
        console.log('Fetching CSRF token...'); // デバッグログ

        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`,
        );

        if (!ignore) {
          console.log('Setting CSRF token...'); // デバッグログ
          axios.defaults.headers.common['csrf-token'] = res.data.csrfToken;
        }
      } catch (error) {
        console.error('CSRF token fetch failed:', error);
      }
    };

    getCsrfToken();

    return () => {
      ignore = true;
    };
  }, []); // dependency array is [] (empty). This tells React to only run this code when the component “mounts” at the first.
};
