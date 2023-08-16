import Auth from '#/components/Auth';
import {Popover, PopoverTrigger, PopoverContent} from '#/components/ui/popover';

export default function SignNavigation() {
  return (
    <Popover>
      <PopoverTrigger>
        <a className="relative inline-block rounded-md text-sm font-medium text-gray-600 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.1),2px_2px_2px_-2px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-sm focus:outline-none focus:ring active:text-gray-500">
          <span className="block rounded-md border bg-white px-8 py-3 hover:bg-gray-50/30">
            登入 | 註冊
          </span>
        </a>
      </PopoverTrigger>
      <PopoverContent>
        <Auth />
      </PopoverContent>
    </Popover>
  );
}
