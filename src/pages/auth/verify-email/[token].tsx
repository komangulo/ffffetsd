import { VerifyEmailPage } from '@/components/auth/VerifyEmailPage';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface VerifyEmailPageProps {
  token: string;
}

const VerifyEmailTokenPage: NextPage<VerifyEmailPageProps> = () => {
  return (
    <>
      <Head>
        <title>Verify your email | Nexus</title>
        <meta name="description" content="Verify your Nexus account email" />
      </Head>
      <AuthLayout>
        <VerifyEmailPage />
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

export default VerifyEmailTokenPage;
