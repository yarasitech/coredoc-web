import { Suspense } from "react";
import DocumentViewer from "@/components/document/DocumentViewer";

export default async function ViewerPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading document...</p>
          </div>
        </div>
      }
    >
      <DocumentViewer documentId={id} />
    </Suspense>
  );
}