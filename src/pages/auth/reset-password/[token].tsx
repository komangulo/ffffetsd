import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: NextPage<ResetPasswordPageProps> = () => {
  return (
    <>
      <Head>
        <title>Reset your password | Nexus</title>
        <meta name="description" content="Reset your Nexus account password" />
      </Head>
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.params as { token: string };
  
  return {
    props: {
      token,
    },
  };
};

export default ResetPasswordPage;
