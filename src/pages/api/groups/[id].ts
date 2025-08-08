import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Group ID is required' });
    }

    try {
      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization || '',
        },
      });

      if (!apiRes.ok) {
        if (apiRes.status === 404) {
          return res.status(404).json({ message: 'Group not found' });
        }
        const errorData = await apiRes.json();
        return res.status(apiRes.status).json(errorData);
      }

      const data = await apiRes.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error(`Error fetching group ${id}:`, error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
