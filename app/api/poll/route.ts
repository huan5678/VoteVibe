import {prisma} from '#/lib/prisma';
import {hash} from 'bcryptjs';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    const {createdById, tags, PollDetail} = req.body;

    if (!createdById || !tags || !PollDetail) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'Missing required fields',
        }),
        {status: 400}
      );
    }

    // TODO: Validate tags

    // Create the poll
    const newPoll = await prisma.poll.create({
      data: {
        createdById,
        tags: {
          create: tags.map((tagName) => ({name: tagName})),
        },
        PollDetail: {
          create: PollDetail,
        },
      },
      include: {
        tags: true,
        PollDetail: true,
      },
    });

    return NextResponse.json(newPoll);
  } catch (error) {
    console.error('Error creating poll:', error);
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: 'Internal server error',
      }),
      {status: 500}
    );
  }
}
