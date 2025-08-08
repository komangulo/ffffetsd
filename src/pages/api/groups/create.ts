import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization || '',
          },
          body: JSON.stringify(req.body),
        }
      );

      if (!apiRes.ok) {
        const errorData = await apiRes.json();
        return res.status(apiRes.status).json(errorData);
      }

      const data = await apiRes.json();
      return res.status(201).json(data);
    } catch (error) {
      console.error('Error creating group:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
