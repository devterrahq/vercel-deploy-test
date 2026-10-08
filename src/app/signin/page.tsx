// import LogInOptions from '@/components/internal/login-options/LogInOptions';
// TODO: Uncomment this when auth is ready
// import { getServerSession } from 'next-auth/next';
// import { RedirectType } from 'next/dist/client/components/redirect';
// import { redirect } from 'next/navigation';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import './page.scss';

export default function SignIn() {
  // TODO: Uncomment this when auth is ready
  // const session = await getServerSession(authOptions);

  // TODO: Uncomment this when auth is ready
  // if (session) {
  //   redirect('/', RedirectType.replace);
  // }

  return (
    <div className='signin container'>
      <h1 className='signin_title'>Log in to your account</h1>
      {/* <LogInOptions /> */}
    </div>
  );
}
