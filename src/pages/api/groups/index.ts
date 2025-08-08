import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups`, {
        headers: {
          'Content-Type': 'application/json',
          // Forward any authentication tokens if necessary
          'Authorization': req.headers.authorization || '',
        },
      });

      if (!apiRes.ok) {
        const errorData = await apiRes.json();
        return res.status(apiRes.status).json(errorData);
      }

      const data = await apiRes.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
