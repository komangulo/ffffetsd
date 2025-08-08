import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'POST') {
    // In a real app, you would add the user to the group in the database
    console.log(`User is joining group ${id}`);
    return res.status(200).json({ message: 'Successfully joined group' });
  }

  if (req.method === 'DELETE') {
    // In a real app, you would remove the user from the group in the database
    console.log(`User is leaving group ${id}`);
    return res.status(200).json({ message: 'Successfully left group' });
  }

  res.setHeader('Allow', ['POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
