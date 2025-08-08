import type { NextApiRequest, NextApiResponse } from 'next';

const mockEvents = [
  {
    id: '1',
    name: 'Tech Conference 2025',
    date: '2025-10-20T09:00:00Z',
    location: 'San Francisco, CA',
    description: 'The biggest tech conference of the year.'
  },
  {
    id: '2',
    name: 'Community Meetup',
    date: '2025-11-15T18:30:00Z',
    location: 'Online',
    description: 'A casual meetup for our community members.'
  },
  {
    id: '3',
    name: 'Design Workshop',
    date: '2025-12-05T14:00:00Z',
    location: 'New York, NY',
    description: 'A hands-on workshop for designers of all levels.'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(mockEvents);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
