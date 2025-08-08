import { EditorCard } from "@/components/EditorCard";
import { useEditors } from "@/hooks/useEditors";

export default function Index() {
  const { editors, loading, error } = useEditors();
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar - Hidden on mobile */}
      <div className="w-full bg-black h-[64px] items-center justify-end px-8 relative hidden lg:flex">
        <div className="absolute top-[-30px] right-8 h-[30px] bg-black w-full"></div>
        <div className="text-white text-[12px] font-bold tracking-[1px] leading-normal">
          VN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ESSEN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HIGHSPEED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WEBMAIL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VOLMOBIL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JOB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IMMO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AUTO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ANZEIGER
        </div>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="flex min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-64px)]">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="w-[324px] bg-black-sidebar flex-shrink-0 hidden lg:block"></div>

        {/* Content Area */}
        <div className="flex-1 max-w-[1024px] bg-white px-4 sm:px-8 py-8 lg:py-[89px] mx-auto">
          {/* Title */}
          <div className="mb-[30px] lg:mb-[57px]">
            <h1
              className="text-black text-[28px] lg:text-[42px] font-extrabold leading-[100%] lg:leading-[112%] tracking-[-0.56px] lg:tracking-[-0.84px]"
              style={{ fontFamily: 'Greta Sans Pro, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Unsere Autor:innen
            </h1>
          </div>

          {/* Editors Grid */}
          <div className="flex flex-col gap-[30px] lg:grid lg:grid-cols-2 lg:gap-y-[33px] lg:gap-x-[22px] lg:max-w-[842px] lg:justify-items-start">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-2 border-primary-yellow border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-primary-text">Loading editors...</p>
                </div>
              </div>
            ) : error ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-red-600 mb-2">Error loading editors</p>
                  <p className="text-primary-text text-sm">{error}</p>
                </div>
              </div>
            ) : (
              editors.map((editor) => (
                <EditorCard key={editor.id} editor={editor} />
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Hidden on mobile */}
        <div className="w-[324px] bg-black-sidebar flex-shrink-0 hidden lg:block"></div>
      </div>
    </div>
  );
}
