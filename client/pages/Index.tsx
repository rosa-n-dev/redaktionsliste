import { EditorCard } from "@/components/EditorCard";
import { useEditors } from "@/hooks/useEditors";

export default function Index() {
  const { editors, loading, error } = useEditors();
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
