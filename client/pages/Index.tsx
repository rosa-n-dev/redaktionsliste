import { EditorCard, Editor } from "@/components/EditorCard";

// Sample data that matches the Figma design
const sampleEditors: Editor[] = [
  {
    id: "1",
    name: "Marc Springer",
    role: "chefredakteur",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/cb7a3f7d228c2b24d4a8c45f66083a1da2a07ffe?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      website: "#"
    }
  },
  {
    id: "2",
    name: "Valentina Dotlić",
    role: "Social Media managerin",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/7021d0c775fdb02063a284c3030f80e456a06ff4?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    id: "3",
    name: "Pascal Pletsch",
    role: "Head of breaking news",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/ead7e88a817cd0a2e35c7159c1a54190e4dde77d?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    id: "4",
    name: "Valentina Dotlić",
    role: "Social Media managerin",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/16659db56de7a68a5b111f3a193e8f4450bd3bae?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    id: "5",
    name: "Marc Springer",
    role: "chefredakteur",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/2dac341957f2f36f75d0f1fa351def59f7c6a588?width=328",
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      website: "#"
    }
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="w-full bg-black h-[64px] flex items-center justify-end px-8 relative">
        <div className="absolute top-[-30px] right-8 h-[30px] bg-black w-full"></div>
        <div className="text-white text-[12px] font-bold tracking-[1px] leading-normal">
          VN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ESSEN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HIGHSPEED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WEBMAIL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VOLMOBIL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JOB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IMMO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AUTO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ANZEIGER
        </div>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-[324px] bg-black-sidebar flex-shrink-0 hidden lg:block"></div>
        
        {/* Content Area */}
        <div className="flex-1 max-w-[1024px] bg-white px-4 sm:px-8 py-[89px] mx-auto">
          {/* Title */}
          <div className="mb-[57px]">
            <h1 
              className="text-black text-[32px] sm:text-[42px] font-extrabold leading-[112%] tracking-[-0.84px]"
              style={{ fontFamily: 'Greta Sans Pro, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Unsere Autor:innen
            </h1>
          </div>
          
          {/* Editors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[33px] gap-x-[22px] max-w-[842px] justify-items-center lg:justify-items-start">
            {sampleEditors.map((editor) => (
              <EditorCard key={editor.id} editor={editor} />
            ))}
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-[324px] bg-black-sidebar flex-shrink-0 hidden lg:block"></div>
      </div>
    </div>
  );
}
