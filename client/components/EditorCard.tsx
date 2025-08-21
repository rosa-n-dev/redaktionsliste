import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export interface Editor {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  email?: string;
  articles?: string; // "Artikel zu Person" - URL to articles
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
    x_url?: string;
    bluesky_url?: string;
  };
}

interface EditorCardProps {
  editor: Editor;
}

export function EditorCard({ editor }: EditorCardProps) {
  console.log(
    "EditorCard - Image URL:",
    editor.imageUrl,
    "for editor:",
    editor.name,
  );

  return (
    <div className="w-full max-w-[317px] lg:max-w-[410px] h-[172px] flex bg-white rounded-[4px] shadow-sm">
      {/* Profile Image */}
      <div className="w-[151px] lg:w-[164px] h-[172px] flex-shrink-0">
        {editor.imageUrl && editor.imageUrl.trim() !== "" ? (
          <img
            src={editor.imageUrl}
            alt={editor.name || "Editor"}
            className="w-full h-full object-cover rounded-l-[4px]"
            style={{ objectPosition: "50% 25%" }}
            onError={(e) => {
              console.log("Image failed to load:", editor.imageUrl);
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
            onLoad={() => {
              console.log("Image loaded successfully:", editor.imageUrl);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-l-[4px] flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        className="flex-1 h-[172px] rounded-r-[4px] relative px-[16px] lg:px-[30px] py-[17px]"
        style={{ backgroundColor: "rgba(242, 241, 234, 0.95)" }}
      >
        {/* Name, Role, Email and Articles */}
        <div className="flex flex-col gap-[5px] mb-[30px] lg:mb-[44px]">
          <h3
            className="text-primary-text font-bold text-[20px] lg:text-[25px] leading-[98%] tracking-[-0.4px] lg:tracking-[-0.5px]"
            style={{
              fontFamily:
                "Greta Sans Pro, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            {editor.name || "Name not available"}
          </h3>
          <div className="inline-flex">
            <span
              className="bg-primary-yellow px-[10px] py-[5px] rounded-[4px] text-primary-text text-[8px] lg:text-[10px] font-black uppercase leading-normal text-center"
              style={{
                fontFamily:
                  "Inter, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              {editor.role || "Role not available"}
            </span>
          </div>


          {/* Articles Button */}
          {editor.articles && (
            <div className="mt-2">
              <a
                href={editor.articles}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 bg-gray-800 text-white text-[10px] lg:text-[11px] font-medium rounded-[3px] hover:bg-gray-700 transition-colors"
                style={{
                  fontFamily:
                    "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Artikel ansehen
                <svg
                  className="ml-1 w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="absolute bottom-[11px] right-[14px] flex gap-[9px] lg:gap-[9.846px]">
          {editor.email && (
            <a
              href={`mailto:${editor.email}`}
              className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
            >
              <Mail className="w-[13.432px] lg:w-[14.61px] h-[13.729px] lg:h-[14.932px] text-black" />
            </a>
          )}
          {editor.socialLinks?.twitter &&
            editor.socialLinks.twitter !== "#" && (
              <a
                href={editor.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
              >
                <Twitter className="w-[13.432px] lg:w-[14.61px] h-[13.729px] lg:h-[14.932px] text-black" />
              </a>
            )}
          {editor.socialLinks?.linkedin &&
            editor.socialLinks.linkedin !== "#" && (
              <a
                href={editor.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
              >
                <Linkedin className="w-[14.676px] lg:w-[15.963px] h-[13.611px] lg:h-[14.804px] text-black" />
              </a>
            )}
          {editor.socialLinks?.instagram &&
            editor.socialLinks.instagram !== "#" && (
              <a
                href={editor.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
              >
                <Instagram className="w-[13.582px] lg:w-[14.773px] h-[13.576px] lg:h-[14.766px] text-black" />
              </a>
            )}
          {editor.socialLinks?.website &&
            editor.socialLinks.website !== "#" && (
              <a
                href={editor.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
              >
                <div className="w-[14px] lg:w-[16.975px] h-[12px] lg:h-[14.995px] bg-black rounded-sm"></div>
              </a>
            )}
          {editor.socialLinks?.x_url && editor.socialLinks.x_url !== "#" && (
            <a
              href={editor.socialLinks.x_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
            >
              {/* X (Twitter) Icon */}
              <svg
                className="w-[13.432px] lg:w-[14.61px] h-[13.729px] lg:h-[14.932px] text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          {editor.socialLinks?.bluesky_url && editor.socialLinks.bluesky_url !== "#" && (
            <a
              href={editor.socialLinks.bluesky_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[22.632px] lg:w-[24.615px] h-[22.632px] lg:h-[24.615px] bg-white rounded-[11.316px] lg:rounded-[12.308px] flex items-center justify-center p-[4.526px] lg:p-[4.923px]"
            >
              {/* Bluesky Icon */}
              <svg
                className="w-[13.432px] lg:w-[14.61px] h-[13.729px] lg:h-[14.932px] text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 2.104.139 3.25.139 5.1.902 6.246c.652.974 1.594.467 2.383.467.73 0 .467 2.058.467 2.058s-.73 1.028-.467 2.058c.263 1.03.897 1.263 1.594.467.697-.796.263-1.796-.467-2.058-.73-.262-1.263.467-1.263.467s.263-1.03.467-2.058c.204-1.028-.467-2.058-.467-2.058s.467-.467 1.263-.467c.796 0 1.263.467 1.263.467s.263 1.03.467 2.058c.204 1.028-.467 2.058-.467 2.058s.263 1.796-.467 2.058c-.73.262-1.263-.467-1.263-.467s-.667.729 0 1.263c.697.796 1.331.563 1.594-.467.263-1.03-.467-2.058-.467-2.058s.263-.467 1.263-.467c.789 0 1.731.507 2.383-.467.763-1.146.763-2.996 0-4.142-.661-.838-1.666-1.16-4.302.701C16.046 4.747 13.087 8.686 12 10.8z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
