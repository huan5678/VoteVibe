'use client';

import {Drawer} from 'vaul';

import VoteForm from './VoteForm';

export default function VoteDrawer() {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button>發起新投票</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[96%] flex-col overflow-hidden rounded-t-[10px] bg-zinc-100">
          <VoteForm />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
