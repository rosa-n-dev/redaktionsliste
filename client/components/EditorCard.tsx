import { Twitter, Linkedin, Instagram } from 'lucide-react';

export interface Editor {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

interface EditorCardProps {
  editor: Editor;
}

export function EditorCard({ editor }: EditorCardProps) {
  console.log('EditorCard received editor:', editor);

  return (
    <div className="w-full max-w-[317px] lg:max-w-[410px] h-[172px] flex bg-white rounded-[4px] shadow-sm">
      {/* Profile Image */}
      <div className="w-[151px] lg:w-[164px] h-[172px] flex-shrink-0">
        <img
          src={editor.imageUrl}
          alt={editor.name}
          className="w-full h-full object-cover rounded-l-[4px]"
        />
      </div>

      {/* Content Area */}
      <div
        className="flex-1 h-[172px] rounded-r-[4px] relative px-[16px] lg:px-[30px] py-[17px]"
        style={{ backgroundColor: 'rgba(242, 241, 234, 0.95)' }}
      >
        {/* Name and Role */}
        <div className="flex flex-col gap-[5px] mb-[44px] lg:mb-[64px]">
          <h3
            className="text-primary-text font-bold text-[20px] lg:text-[25px] leading-[98%] tracking-[-0.4px] lg:tracking-[-0.5px]"
            style={{ fontFamily: 'Greta Sans Pro, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            {editor.name || 'Name not available'}
          </h3>
          <div className="inline-flex">
            <span
              className="bg-primary-yellow px-[10px] py-[5px] rounded-[4px] text-primary-text text-[8px] lg:text-[10px] font-black uppercase leading-normal text-center"
              style={{ fontFamily: 'Inter, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              {editor.role || 'Role not available'}
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute bottom-[11px] right-[14px] flex gap-[9px] lg:gap-[9.846px]">
          {editor.socialLinks?.twitter && editor.socialLinks.twitter !== '#' && (
            <a
              href={editor.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
            >
              <Twitter className="w-[13.432px] lg:w-[14.61px] h-[13.729px] lg:h-[14.932px] text-black" />
            </a>
          )}
          {editor.socialLinks?.linkedin && editor.socialLinks.linkedin !== '#' && (
            <a
              href={editor.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
            >
              <Linkedin className="w-[14.676px] lg:w-[15.963px] h-[13.611px] lg:h-[14.804px] text-black" />
            </a>
          )}
          {editor.socialLinks?.instagram && editor.socialLinks.instagram !== '#' && (
            <a
              href={editor.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
            >
              <Instagram className="w-[13.582px] lg:w-[14.773px] h-[13.576px] lg:h-[14.766px] text-black" />
            </a>
          )}
          {editor.socialLinks?.website && editor.socialLinks.website !== '#' && (
            <a
              href={editor.socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
            >
              <div className="w-[14px] lg:w-[16.975px] h-[12px] lg:h-[14.995px] bg-black rounded-sm"></div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
