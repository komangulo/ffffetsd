import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { PublicRoute } from '@/components/auth/PublicRoute';
import { NextPage } from 'next';
import Head from 'next/head';

const ForgotPasswordPage: NextPage = () => {
  return (
    <PublicRoute>
      <>
        <Head>
          <title>Reset your password | Nexus</title>
          <meta name="description" content="Reset your Nexus account password" />
        </Head>
        <AuthLayout>
          <ForgotPasswordForm />
        </AuthLayout>
      </>
    </PublicRoute>
  );
};

export default ForgotPasswordPage;
